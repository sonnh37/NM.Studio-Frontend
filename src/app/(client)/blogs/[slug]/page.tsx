"use client";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { DisplayContent } from "@/components/client/common/display-content";
import { createEditorState, formatDate } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blog";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { useQuery } from "@tanstack/react-query";

import ErrorSystem from "@/components/_common/errors/error-system";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const query: BlogGetAllQuery = {
    isDeleted: false,
    isFeatured: false,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: slug,
  };

  const {
    data: blog = {} as Blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBlog"],
    queryFn: async () => {
      const response = await blogService.fetchAll(query);
      return response.data?.results![0];
    },
  });

  const editorState = createEditorState(blog?.content ?? "");

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <>
      <div className="container mx-auto space-y-8 py-16">
        <div className="grid justify-center gap-2">
          <h1 className="text-4xl text-center">{blog.title}</h1>
          <div className="flex flex-row justify-center gap-4">
            <p className="text-gray-500 text-sm">{blog.createdBy ?? "Admin"}</p>
            <p className="text-gray-500 text-sm">|</p>
            <p className="text-gray-500 text-sm">
              {formatDate(blog.createdDate)}
            </p>
          </div>
        </div>
        <div className="">
          {editorState && <DisplayContent value={blog.content ?? ""} />}
        </div>
      </div>
    </>
  );
}
