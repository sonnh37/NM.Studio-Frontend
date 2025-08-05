"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import {LoadingPageComponent} from "@/components/_common/loading-page";

import { BlogForm } from "@/components/sites/dashboard/sites/blogs/create-update-form";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/entities/blog";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
            const response = await blogService.getById(
                params.blogId as string
            );
            return response.data;
        },
        enabled: !!params.blogId,
    });

    if (isLoading) return <LoadingPageComponent/>;

    if (isError) {
        console.log("Error fetching:", error);
        return <ErrorSystem/>;
    }
    return (
        <div className="space-y-6">
            <BlogForm initialData={data}/>
        </div>
    );
}
