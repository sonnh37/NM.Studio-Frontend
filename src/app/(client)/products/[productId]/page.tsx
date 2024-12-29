"use client";
import { DisplayContent } from "@/components/client/common/display-content";
import ErrorSystem from "@/components/common/errors/error-system";
import {LoadingPageComponent} from "@/components/common/loading-page";

import { formatDate } from "@/lib/utils";
import { productService } from "@/services/product-service";
import { Product } from "@/types/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const query: ProductGetAllQuery = {
    isDeleted: false,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: productId,
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchProduct"],
    queryFn: async () => {
      const response = await productService.fetchAll(query);
      return response.data?.results?.[0] as Product;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <>
      {product && (
        <div className="container px-16 mx-auto ">
          <div className="grid justify-center grid-cols-2 gap-4">
           
          </div>
          <div className="">
            <DisplayContent value={product.description ?? ""} />
          </div>
        </div>
      )}
    </>
  );
}
