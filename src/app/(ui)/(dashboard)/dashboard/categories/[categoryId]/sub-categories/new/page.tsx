"use client";
import { SubCategoryForm } from "@/components/sites/dashboard/sites/sub-categories/create-update-form";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const subCategory: any = {
    categoryId: params.categoryId as string,
  };

  return (
    <div className="space-y-6">
      <SubCategoryForm initialData={subCategory} />
    </div>
  );
}
