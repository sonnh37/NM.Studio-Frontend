"use client";

import { productService } from "@/services/product-service";
import { Product } from "@/types/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pagination } from "@/components/client/common/pagination";
import { Button } from "@/components/ui/button";
import Example from "./dialog";
import Image from "next/image";

export function ProductCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [queryProduct, setQueryProduct] = useState<ProductGetAllQuery>({
    isPagination: true,
    pageSize: 12,
    pageNumber: 1,
    isNotNullSlug: true,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const categoryName = searchParams.get("categoryName");
  const subCategoryName = searchParams.get("subCategoryName");
  const sizes = searchParams.getAll("size");
  const colors = searchParams.getAll("color");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = parseInt(searchParams.get("sortOrder") || "0", 10);
  const pageNumber = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    setQueryProduct((prev) => ({
      ...prev,
      categoryName: categoryName || undefined,
      subCategoryName: subCategoryName || undefined,
      sizes: sizes.length > 0 ? sizes : undefined,
      colors: colors.length > 0 ? colors : undefined,
      sortOrder: sortOrder !== 0 ? sortOrder : undefined,
      sortField: sortBy || undefined,
      pageNumber: pageNumber,
      isDeleted: [false]
    }));
  }, [
    categoryName,
    subCategoryName,
    JSON.stringify(sizes),
    JSON.stringify(colors),
    sortBy,
    sortOrder,
    pageNumber,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!queryProduct) return;
      try {
        const response = await productService.fetchAll(queryProduct);

        console.log("check_", response)
        setProducts(response.data!.results || []);
        setTotalPages(response.data!.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, [queryProduct]);

  function handleOpenDialog(pr: Product) {
    setOpen(true);
    setSelectedProduct(pr);
  }

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
        {products.map((product) => (
          <div className="grid grid-cols-1 overflow-hidden">
            <div className="relative group overflow-hidden rounded-md">
              <motion.div
                key={product.id}
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }}
              >
                <Image
                  className="aspect-[2/3] bg-gray-200 rounded-md object-cover"
                  alt={product.name!}
                  src={
                    product.productXPhotos.length > 0 &&
                    product.productXPhotos[0].photo
                      ? (product.productXPhotos[0].photo.src ?? "/image-notfound.jpg") 
                      : "/image-notfound.jpg"
                  }
                  width={500}
                  height={500}
                />
              </motion.div>
              <div className="absolute bottom-0 z-10 left-0 w-full bg-neutral-700 bg-opacity-70 py-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <Button
                  variant="link"
                  className="mx-auto block py-2 px-4 text-white font-bold"
                  onClick={() => handleOpenDialog(product)}
                >
                  XEM NHANH
                </Button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span className="inset-0" />
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
        <Example
          product={selectedProduct as Product}
          open={open}
          setOpen={setOpen}
        />
      </div>

      {/* Pagination */}
      <Pagination currentPage={pageNumber} totalPages={totalPages} />
    </div>
  );
}
