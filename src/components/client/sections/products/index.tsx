/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {useEffect, useState} from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon} from '@heroicons/react/20/solid'
import {ProductCards} from "@/components/client/sections/products/product-cards";
import {useRouter, useSearchParams} from "next/navigation";
import {colorService} from "@/services/color-service";
import {sizeService} from "@/services/size-service";
import {categoryService} from "@/services/category-service";
import {Color} from "@/types/color";
import {Category, SubCategory} from "@/types/category";
import {Size} from "@/types/size";
import {CategoryGetAllQuery} from "@/types/queries/product-query";
import {Button} from "@/components/ui/button";


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function SidebarProductCards() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const searchParams = useSearchParams();
    const router = useRouter();
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [filters, setFilters] = useState([
        {
            id: 'color',
            name: 'Color',
            options: [],
        },
        {
            id: 'size',
            name: 'Size',
            options: [],
        },
    ]);
    const [selectedFilters, setSelectedFilters] = useState<{
        [key: string]: string[]; // key là id của section, value là danh sách các giá trị được chọn
    }>({});

    const prevParams = new URLSearchParams(searchParams)

    // prevParams.delete('sortBy');
    // prevParams.delete('sortOrder');

    const [sortOptions, setSortOptions] = useState([
        {name: 'Newest', sortBy: `createdDate`, sortOrder: -1, current: true},
        {name: 'Price: Low to High', sortBy: `price`, sortOrder: 1, current: false},
        {name: 'Price: High to Low', sortBy: `price`, sortOrder: -1, current: false},
    ]);

    const handleSortChange = (sortOption: any) => {
        const updatedSortOptions = sortOptions.map(option => ({
            ...option,
            current: option.sortBy === sortOption.sortBy && option.sortOrder === sortOption.sortOrder, // Đánh dấu tùy chọn hiện tại

        }));
        setSortOptions(updatedSortOptions);
        console.log("updatedSortOptions", updatedSortOptions);

        const newParams = new URLSearchParams(searchParams);

        newParams.set('sortBy', sortOption.sortBy);
        newParams.set('sortOrder', sortOption.sortOrder.toString());

        router.push(`?${newParams.toString()}`, undefined);
    };

    const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
        setSelectedFilters((prev) => {
            const updatedSection = checked
                ? [...(prev[sectionId] || []), value]
                : (prev[sectionId] || []).filter((item) => item !== value);

            return {
                ...prev,
                [sectionId]: updatedSection,
            };
        });

        // Cập nhật URL sau khi xử lý state
        const newParams = new URLSearchParams(searchParams);

        // Xóa giá trị hiện tại của sectionId
        newParams.delete(sectionId);

        // Thêm các giá trị được chọn mới
        const selectedItems = checked
            ? [...(selectedFilters[sectionId] || []), value]
            : (selectedFilters[sectionId] || []).filter((item) => item !== value);

        selectedItems.forEach((item) => {
            newParams.append(sectionId, item);
        });

        router.push(`?${newParams.toString()}`, undefined);
    };

    const handleSubCategoryChange = (subcate: SubCategory) => {
        const newParams = new URLSearchParams(searchParams);


        // Xóa giá trị hiện tại của sectionId
        newParams.delete("subCategoryName");

        newParams.append("subCategoryName", subcate.name!);

        router.push(`?${newParams.toString()}`, undefined);
    };

    const handleCategoryChange = (cate: Category) => {
        const newParams = new URLSearchParams(searchParams);

        // Xóa giá trị hiện tại của sectionId
        newParams.delete("categoryName");

        newParams.append("categoryName", cate.name!);

        router.push(`?${newParams.toString()}`, undefined);
    };


    const fetchColors = async () => {
        const response = await colorService.fetchAll();
        return response.data?.results;
    };

    const fetchSizes = async () => {
        const response = await sizeService.fetchAll();
        return response.data?.results;
    };

    const fetchCategoryByCategoryName = async () => {
        const key = searchParams.get("categoryName");
        const request: CategoryGetAllQuery = {
            isPagination: true,
            pageSize: 1,
            name: key ?? undefined,
        }
        const response = await categoryService.fetchAll(request);
        return response.data?.results![0];
    };

    const fetchCategories = async () => {
        const response = await categoryService.fetchAll();
        return response.data?.results;
    };

    const fetchData = async () => {
        try {
            const [fetchedColors, fetchedSizes, fetchedCategories, category] = await Promise.all([
                fetchColors(),
                fetchSizes(),
                fetchCategories(),
                fetchCategoryByCategoryName(),
            ]);

            setColors(fetchedColors!);
            setSizes(fetchedSizes!);
            setCategories(fetchedCategories!);
            setSubCategories(category ? category.subCategories! : []);

            const params = new URLSearchParams(searchParams);

            // Đồng bộ sortOptions
            syncSortOptions(params);

            // Đồng bộ selectedFilters và cập nhật filters
            const updatedFilters = syncSelectedFilters(params);
            updateFilters(fetchedColors!, fetchedSizes!, fetchedCategories!, updatedFilters!);

        } catch (error) {
            console.error(error);
        }
    };


    const updateFilters = (fetchedColors: Color[], fetchedSizes: Size[], fetchedCategories: Category[], updatedFilters: {
        [key: string]: string[]
    }) => {
        setFilters((prevFilters) => prevFilters.map((filter: any) => {
            if (filter.id === 'color') {
                return {
                    ...filter,
                    options: fetchedColors
                        ? fetchedColors.map((color) => ({
                            value: color.name,
                            label: color.name,
                            checked: updatedFilters['color']?.includes(color.name!) || false,
                        }))
                        : [],
                };
            } else if (filter.id === 'size') {
                return {
                    ...filter,
                    options: fetchedSizes
                        ? fetchedSizes.map((size) => ({
                            value: size.name,
                            label: size.name,
                            checked: updatedFilters['size']?.includes(size.name!) || false,
                        }))
                        : [],
                };
            }
            return filter;
        }));
    };

    const syncSelectedFilters = (params: URLSearchParams) => {
        const updatedFilters: { [key: string]: string[] } = {};
        const filters_id = filters.map(m => m.id)

        filters_id.forEach((id) => {
            const values = params.getAll(id);
            if (values.length > 0) {
                updatedFilters[id] = values;
            }
        });

        setSelectedFilters(updatedFilters);
        return updatedFilters;
    };
    const syncSortOptions = (params: URLSearchParams) => {
        const sortBy = params.get('sortBy');
        const sortOrder = params.get('sortOrder');
        if (sortBy && sortOrder) {
            setSortOptions((prev) =>
                prev.map((option) => ({
                    ...option,
                    current: option.sortBy === sortBy && option.sortOrder.toString() === sortOrder,
                }))
            );
        }
    };

    useEffect(() => {
        fetchData()
            .then((data) => {
                const params = new URLSearchParams(searchParams);

                const updatedFilters = syncSelectedFilters(params);
                updateFilters(colors, sizes, categories, updatedFilters);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [searchParams]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6"/>
                                </button>
                            </div>


                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton
                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    onClick={() => handleSortChange(option)}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="size-5"/>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5"/>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                {
                                    searchParams.size === 0 ?
                                        <>
                                            <h3 className="sr-only">Categories</h3>
                                            <ul role="list"
                                                className="border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                                {categories.map((category) => (
                                                    <li key={category.id}>
                                                        <Button type={"button"}
                                                                onClick={() => handleCategoryChange(category)}
                                                                variant="ghost">+ &nbsp; {category.name}</Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                        :
                                        <>
                                            <h3 className="sr-only">SubCategories</h3>
                                            <ul role="list"
                                                className="border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                                {subCategories.map((category) => (
                                                    <li key={category.id}>
                                                        <Button type={"button"}
                                                                onClick={() => handleSubCategoryChange(category)}
                                                                variant="ghost">- &nbsp; {category.name}</Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                }


                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton
                                                className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                  <PlusIcon aria-hidden="true"
                                                            className="size-5 group-data-[open]:hidden"/>
                                                  <MinusIcon aria-hidden="true"
                                                             className="size-5 [.group:not([data-open])_&]:hidden"/>
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option: any, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`}
                                                               className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <ProductCards/>

                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
