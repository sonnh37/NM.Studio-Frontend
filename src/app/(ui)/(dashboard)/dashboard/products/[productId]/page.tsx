"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { ProductForm } from "@/components/sites/dashboard/sites/products/create-update-form";
import { getValidateString, processResponse } from "@/lib/utils";
import { productService } from "@/services/product-service";
import { Product } from "@/types/entities/product";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const productId = getValidateString(params.productId);
  if (!productId) return <ErrorSystem message="Invalid productId" />;
  const {
    data = {} as Product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchProductById", productId],
    queryFn: () =>
      productService.getById(productId as string, [
        "categories",
        "subCategory",
        "thumbnail",
      ]),
    enabled: !!productId,
    refetchOnWindowFocus: false,
    gcTime: 0,
    select: (result) => processResponse(result),
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <ProductForm initialData={data} />
    </div>
  );
}
