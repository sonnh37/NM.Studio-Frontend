"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { categoryService } from "@/services/category-service";
import { Category } from "@/types/entities/category";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const {
    data = {} as Category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchCategoryById", params.categoryId],
    queryFn: async () => {
      const response = await categoryService.getById(
        params.categoryId as string,
        ["subCategories"]
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

  const subCategories = data.subCategories || [];

  // ...existing code...
  const handleCreate = () => {
    // route to a "new" page under the same category - create this route if needed
    router.push(
      `/dashboard/categories/${params.categoryId}/sub-categories/new`
    );
  };

  const handleDelete = (subId?: string) => {
    if (!subId) return;
    const ok = window.confirm(
      "Xoá sub-category này? Hành động không thể hoàn tác."
    );
    if (!ok) return;
    // TODO: gọi API xoá rồi refetch (placeholder)
    console.log("Delete subCategory", subId);
    // Example: await categoryService.deleteSubCategory(subId);
    // then refetch the category (useQuery's queryClient.invalidateQueries...)
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Sub-categories</h1>
          <p className="text-sm text-muted-foreground">
            Danh sách các sub-category của "{data.name}"
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Total: {subCategories.length}
          </span>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            {/* simple plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Subcategory
          </button>
        </div>
      </header>

      {subCategories.length === 0 ? (
        <div className="rounded-md border border-dashed border-gray-200 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Chưa có sub-category nào.
          </p>
          <div className="mt-4">
            <button
              onClick={handleCreate}
              className="rounded-md bg-primary px-4 py-2 text-sm text-white"
            >
              Tạo sub-category
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {subCategories.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {sub.name}
                    </div>
                    {/* {sub.itemCount !== undefined && <div className="text-xs text-muted-foreground">{sub.itemCount} items</div>} */}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {sub.description || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {sub.slug || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/categories/${params.categoryId}/sub-categories/${sub.id}`}
                        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="rounded-md border border-red-600 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
