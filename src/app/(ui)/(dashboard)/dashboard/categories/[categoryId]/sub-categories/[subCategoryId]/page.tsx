"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { CategoryForm } from "@/components/sites/dashboard/sites/categories/create-update-form";
import { SubCategoryForm } from "@/components/sites/dashboard/sites/sub-categories/create-update-form";
import { categoryService } from "@/services/category-service";
import { subCategoryService } from "@/services/sub-category-service";
import { Category } from "@/types/entities/category";
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
    queryKey: ["fetchSubCategoryById", params.subCategoryId],
    queryFn: async () => {
      const response = await subCategoryService.getById(
        params.subCategoryId as string
      );
      return response.data;
    },
    enabled: !!params.subCategoryId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <SubCategoryForm initialData={data} />
    </div>
  );
}
