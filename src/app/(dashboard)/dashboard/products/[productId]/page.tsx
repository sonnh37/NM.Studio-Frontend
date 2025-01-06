"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { ProductForm } from "@/components/dashboard/sites/products/create-update-form";
import { productService } from "@/services/product-service";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const {
      data = {} as Product,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["fetchProductById", params.productId],
      queryFn: async () => {
        const response = await productService.fetchById(
          params.productId as string
        );
        return response.data;
      },
      enabled: !!params.productId,
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
