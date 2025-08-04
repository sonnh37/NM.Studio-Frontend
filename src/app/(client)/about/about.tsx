"use client";
import {DisplayContent} from "@/components/client/common/display-content";
import ErrorSystem from "@/components/_common/errors/error-system";

import {formatDate} from "@/lib/utils";
import {blogService} from "@/services/blog-service";
import {Blog} from "@/types/entities/blog";
import {BlogGetAllQuery} from "@/types/queries/blog-query";
import {useQuery} from "@tanstack/react-query";

import Image from "next/image";

export default function AboutPage() {

    const query: BlogGetAllQuery = {
        pagination: {
            isPagingEnabled: true,
            pageSize: 1,
            pageNumber: 1,
        },

        isDeleted: false,
        isFeatured: true,
    };
    const {
        data: blogs = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["fetchBlog"],
        queryFn: async ()=> {
            const response = await blogService.getAll(query);
            return response.data?.results;
        },
    });

    if (isError) {
        console.log("Error fetching:", error);
        return <ErrorSystem/>;
    }

    if (blogs?.length == 0) return "Chưa có bài viết";

    const blog = blogs[0];
    return (
        <>
            <div className="container mx-auto space-y-8 py-16">
                <div className="grid justify-center gap-2 ">
                    <h1 className="text-4xl text-center">{blog.title}</h1>
                    <div className="flex flex-row justify-center gap-4">
                        <p className="text-gray-500 text-sm">
                            {blog.createdBy ?? "Admin"}
                        </p>
                        <p className="text-gray-500 text-sm">|</p>
                        <p className="text-gray-500 text-sm">
                            {formatDate(blog.createdDate)}
                        </p>
                    </div>
                </div>

                <div className="">
                    <DisplayContent value={blog.content ?? ""}/>
                </div>
            </div>
        </>
    );
}
