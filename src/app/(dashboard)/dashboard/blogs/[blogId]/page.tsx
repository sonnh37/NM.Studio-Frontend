"use client";
import {Blog} from "@/types/blog";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {BlogForm} from "@/components/dashboard/sections/blogs/create-update-form";
import { blogService } from "@/services/blog-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import PageLoading from "@/components/common/page-loading";
import ErrorPage from "@/app/(client)/error/page";

export default function Page() {
    const params = useParams();
    const {
      data = {} as Blog,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["fetchBlogById", params.blogId],
      queryFn: async () => {
        const response = await blogService.fetchById(
          params.blogId as string
        );
        return response.data;
      },
      enabled: !!params.blogId,
    });
  
    if (isLoading) return <PageLoading/>;
  
    if (isError) {
      console.log("Error fetching:", error);
      return <ErrorPage />;
    }
    return (
        <div className="space-y-6">
            <BlogForm initialData={data}/>
        </div>
    );
}
