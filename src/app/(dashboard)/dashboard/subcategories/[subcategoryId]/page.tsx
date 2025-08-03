"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { SubCategoryForm } from "@/components/dashboard/sites/sub-categories/create-update-form";
import { subCategoryService } from "@/services/sub-category-service";
import { SubCategory } from "@/types/entities/category";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as SubCategory,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchSubCategoryById", params.subcategoryId],
    queryFn: async () => {
      const response = await subCategoryService.getById(
        params.subcategoryId as string
      );
      return response.data;
    },
    enabled: !!params.subcategoryId,
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
