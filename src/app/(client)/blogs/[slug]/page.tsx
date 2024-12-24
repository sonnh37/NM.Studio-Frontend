"use client";
import React from "react";
import {blogService} from "@/services/blog-service";
import {Blog} from "@/types/blog";
import {BlogGetAllQuery} from "@/types/queries/blog-query";
import {createEditorState, formatDate} from "@/lib/utils";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import ErrorPage from "../../error/page";
import {DisplayContent} from "@/components/client/common/display-content";

export default function Page({params}: { params: { slug: string } }) {
    const {slug} = params;
    const query: BlogGetAllQuery = {

        isDeleted: false,
        isFeatured: false,
        isPagination: true,
        pageSize: 1,
        pageNumber: 1,
        slug: slug,
    };

    const {data: blog = {} as Blog, error} = useQuery({
        queryKey: ["fetchBlog"],
        queryFn: async () => {
            const response = await blogService.fetchAll(query);
            return response.data?.results![0];
        },
    });

    const editorState = createEditorState(blog?.content ?? "");

    if (error) {
        console.log("Error fetching:", error);
        return <ErrorPage/>;
    }

    return (
        <>
            <div className="service-details container mx-auto space-y-8 py-16">
                <div className="grid justify-center gap-8">
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
                    <div>
                        <Image
                            alt={blog.title ?? ""}
                            className="object-cover"
                            src={blog.thumbnail ?? "/image-notfound.jpg"}
                            height={9999}
                            width={9999}
                        />
                    </div>
                </div>
                <div className="container">
                    {editorState && (
                        <DisplayContent value={blog.content ?? ""}/>
                    )}
                </div>
                {/* Render other service details here */}
            </div>
        </>
    );
}
