"use client";
import React, { useState } from "react";
import { Service } from "@/types/service";
import { ContentState, convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blog";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { createEditorState, formatDate } from "@/lib/utils";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../error/page";
import { TinyMCEReadOnly } from "@/components/client/common/tinymce-readonly";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false, // Disable SSR for this component
  }
);

export default function Page() {
  const query: BlogGetAllQuery = {
    isNotNullSlug: true,
    isDeleted: [false],
    isFeatured: true,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
  };

  const { data: blogData, error } = useQuery({
    queryKey: ["fetchBlog"],
    queryFn: async () => {
      const response = await blogService.fetchAll(query);
      return response.data?.results?.[0] as Blog;
    },
  });

  const editorState = createEditorState(blogData?.content ?? "");

  if (error) {
    console.log("Error fetching:", error);
    return <ErrorPage/>; 
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
            <TinyMCEReadOnly value={blogData.content ?? ""}/>
            {/* {editorState && (
              <Editor editorState={editorState} readOnly={true} toolbarHidden />
            )} */}
          </div>
        </div>
      )}
    </>
  );
}
