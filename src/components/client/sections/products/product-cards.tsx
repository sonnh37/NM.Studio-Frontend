"use client";

import {productService} from "@/services/product-service";
import {Product} from "@/types/product";
import {ProductGetAllQuery} from "@/types/queries/product-query";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Image} from "@nextui-org/react";
import {motion} from "framer-motion";
import {Pagination} from "@/components/client/common/pagination";

export function ProductCards() {
    const [products, setProducts] = useState<Product[]>([]);
    const [queryProduct, setQueryProduct] = useState<ProductGetAllQuery>({
        isPagination: true,
        pageSize: 12,
        pageNumber: 1,
    });
    const [totalPages, setTotalPages] = useState(1);

    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryName = searchParams.get("categoryName");
    const subCategoryName = searchParams.get("subCategoryName");
    const sortBy = searchParams.get("sortBy");
    const sortOrder = parseInt(searchParams.get("sortOrder") || "0", 10);
    const pageNumber = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        setQueryProduct((prev) => ({
            ...prev,
            categoryName: categoryName || undefined,
            subCategoryName: subCategoryName || undefined,
            pageNumber: pageNumber,
            sortOrder: sortOrder != 0 ? sortOrder : undefined,
            sortField: sortBy || undefined,
        }));
    }, [categoryName, subCategoryName, pageNumber, sortOrder, sortBy]);



    useEffect(() => {
        const fetchData = async () => {
            if (!queryProduct) return;
            console.log("check_field", queryProduct)

            try {
                const response = await productService.fetchAll(queryProduct);
                setProducts(response.data!.results || []);
                setTotalPages(response.data!.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchData();
    }, [queryProduct]);

    return (
        <div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                    <div className="relative">
                        <div className="overflow-hidden rounded-md">
                            <motion.div
                                className=""
                                whileHover={{scale: 1.1}}
                                transition={{
                                    duration: 0.3,
                                    ease: "linear",
                                }}
                            >
                                <Image
                                    className="aspect-square w-full bg-gray-200 rounded-md object-cover lg:aspect-auto lg:h-96"
                                    alt={product.name}
                                    src={
                                        product.productXPhotos.length > 0 &&
                                        product.productXPhotos[0].photo
                                            ? product.productXPhotos[0].photo.src
                                            : "/image-notfound.jpg"
                                    }
                                />
                            </motion.div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a>
                                        <span className="inset-0"/>
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {product.color?.name}
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                                {product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
    );
}
