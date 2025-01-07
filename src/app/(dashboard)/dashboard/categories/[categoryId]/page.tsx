"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { CategoryForm } from "@/components/dashboard/sites/categories/create-update-form";
import { categoryService } from "@/services/category-service";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as Category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchCategoryById", params.categoryId],
    queryFn: async () => {
      const response = await categoryService.fetchById(
        params.categoryId as string
      );
      return response.data;
    },
    enabled: !!params.categoryId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <CategoryForm initialData={data} />
    </div>
  );
}
