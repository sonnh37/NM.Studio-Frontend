"use client";

import { productService } from "@/services/product-service";
import { Product } from "@/types/entities/product";
import { ProductGetAllQuery } from "@/types/cqrs/queries/product-query";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pagination } from "@/components/sites/client/common/pagination";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductCard } from "./product-card";

export function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryName = searchParams.get("categoryName");
  const subCategoryName = searchParams.get("subCategoryName");
  // const sizes = searchParams.getAll("size");
  // const colors = searchParams.getAll("color");
  const sortBy = searchParams.get("sortBy") || "createdDate";
  const sortOrder = parseInt(searchParams.get("sortOrder") || "0", 10);
  const pageNumber = parseInt(searchParams.get("page") || "1", 10);

  // Tạo đối tượng queryProduct
  const queryProduct: ProductGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: pageNumber,
      pageSize: 12,
    },
    sorting: {
      sortDirection: sortOrder === 0 ? 1 : sortOrder,
      sortField: sortBy,
    },
    isDeleted: false,
    categoryName: categoryName,
    subCategoryName: subCategoryName,
    // sizes: sizes.length > 0 ? sizes,
    // colors: colors.length > 0 ? colors,
    // sortOrder: sortOrder !== 0 ? sortOrder,
  };

  const { data, isError, error } = useQuery({
    queryKey: ["fetchProducts", queryProduct], // Dùng queryKey bao gồm queryProduct để đảm bảo query được tái sử dụng khi queryProduct thay đổi
    queryFn: async () => {
      const response = await productService.getAll(queryProduct);
      return response.data; // Giả sử API trả về kiểu dữ liệu như bạn mong muốn
    },
  });

  // Cập nhật sản phẩm và tổng số trang
  const products = data?.results || [];
  const totalPages = data?.pageCount || 1;

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={pageNumber} totalPages={totalPages} />
    </div>
  );
}
