"use client";
import { DisplayContent } from "@/components/client/common/display-content";
import ErrorSystem from "@/components/common/errors/error-system";
import {LoadingPageComponent} from "@/components/common/loading-page";

import { formatDate } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blog";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Page() {
  const query: BlogGetAllQuery = {
    isDeleted: false,
    isFeatured: true,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
  };

  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBlog"],
    queryFn: async () => {
      const response = await blogService.fetchAll(query);
      return response.data?.results?.[0] as Blog;
    },
  });

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }
  return (
    <>
      {blogData && (
        <div className="service-details container mx-auto space-y-8 py-16">
          <div className="grid justify-center gap-8">
            <div className="grid justify-center gap-2 ">
              <h1 className="text-4xl text-center">{blogData.title}</h1>
              <div className="flex flex-row justify-center gap-4">
                <p className="text-gray-500 text-sm">
                  {blogData.createdBy ?? "Admin"}
                </p>
                <p className="text-gray-500 text-sm">|</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(blogData.createdDate)}
                </p>
              </div>
            </div>
            <div>
              <Image
                alt={blogData.title ?? ""}
                className="object-cover"
                src={blogData.thumbnail ?? "/image-notfound.jpg"}
                height={9999}
                width={9999}
              />
            </div>
          </div>
          <div className="container">
            <DisplayContent value={blogData.content ?? ""} />
            {/* {editorState && (
              <Editor editorState={editorState} readOnly={true} toolbarHidden />
            )} */}
          </div>
        </div>
      )}
    </>
  );
}
