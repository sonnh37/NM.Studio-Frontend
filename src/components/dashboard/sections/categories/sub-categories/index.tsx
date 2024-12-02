import {columns} from "./columns";
import {isActive_options, isDeleted_options,} from "@/components/common/filters";
import {DataTable} from "@/components/common/data-table-generic/data-table";
import {useEffect, useState} from "react";
import {SubCategoryGetAllQuery} from "@/types/queries/category-query";
import {SubCategory} from "@/types/category";
import {ColumnDef} from "@tanstack/react-table";
import {DataOnlyTable} from "@/components/common/data-table-origin/data-only-table";
import {GrSubtract} from "react-icons/gr";
import {HiOutlinePlus} from "react-icons/hi";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";
import { SubCategoryUpdateCommand } from "@/types/commands/category-command";
import { subCategoryService } from "@/services/sub-category-service";

interface DataTableSubCategorysProps {
    categoryId?: string;
    subCategories?: SubCategoryUpdateCommand[];
    tab?: number;
}

export default function DataTableSubCategorys({
                                            categoryId,
                                            tab,
                                            subCategories,
                                        }: DataTableSubCategorysProps) {
    const [getQueryParams, setGetQueryParams] = useState<SubCategoryGetAllQuery>();

    useEffect(() => {
        const defaultQueryParams: SubCategoryGetAllQuery = {
            isPagination: true,
            isNullCategoryId: true,
            isDeleted: [false],
        };

        setGetQueryParams(defaultQueryParams);
    }, [categoryId]);

    const queryClient = useQueryClient();
    const handleRemoveSubCategory = (subCategory: SubCategory) => {
        const subCategory_: SubCategoryUpdateCommand = {
            ...subCategory,
            categoryId: undefined,
        };

        subCategoryService.update(subCategory_).then(async (response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({queryKey: ["category", categoryId]});
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const handleAddSubCategory = (row: SubCategory) => {
        const subCategory_: SubCategoryUpdateCommand = {
            ...row,
            categoryId: categoryId,
        };

        subCategoryService.update(subCategory_).then((response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({queryKey: ["category", categoryId]});
                queryClient.invalidateQueries({queryKey: ["data", getQueryParams]});
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };


    const columns_tab0: ColumnDef<SubCategory>[] = [
        {
            accessorKey: "select",
            header: ({table}) => (
                <></>
            ),
            cell: ({row}) => (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveSubCategory(row.original!)}
                >
                    <GrSubtract/>
                </Button>
            ),
        },
        ...columns,
    ];

    const columns_tab1: ColumnDef<SubCategory>[] = [
        {
            accessorKey: "select",
            header: ({table}) => (
               
                <></>
            ),
            cell: ({row}) => {
                return (
                    <Button
                        type="button"
                        size="icon"
                        onClick={() => handleAddSubCategory(row.original)}
                    >
                        <HiOutlinePlus/>
                    </Button>
                );
            },
        },
        ...columns,
    ];

    return tab == 0 ? (
        <DataOnlyTable
            columns={columns_tab0}
            data={
                subCategories!
                    .filter((subcategory) => subcategory !== undefined) as SubCategory[]
            }
        />
    ) : (
        <DataTable
            deleteData={subCategoryService.delete}
            columns={columns_tab1}
            fetchData={subCategoryService.fetchAll}
            columnSearch="name"
            defaultValues={getQueryParams}
            filterEnums={[
                {columnId: "isActive", title: "Is Active", options: isActive_options},
                {
                    columnId: "isDeleted",
                    title: "Is deleted",
                    options: isDeleted_options,
                },
            ]}
        />
    );
}