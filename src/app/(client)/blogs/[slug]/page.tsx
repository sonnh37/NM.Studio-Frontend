"use client";
import React, { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { ContentState, convertFromRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blog";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false, // Disable SSR for this component
});

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const { slug } = params;
  const query: BlogGetAllQuery = {
    isNotNullSlug: true,
    isDeleted: [false],
    isFeatured: false,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: slug,
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        console.error("Title is null or undefined");
        return;
      }
      try {
        const response = await blogService.fetchAll(query);
        console.log("check_service", response);
        if (response && response.data) {
          const fetchedBlog = response.data!.results![0] as Blog;
          setBlog(fetchedBlog);

          let contentState;

          try {
            // Attempt to parse description as JSON
            contentState = fetchedBlog.content
              ? convertFromRaw(JSON.parse(fetchedBlog.content))
              : ContentState.createFromText("");
          } catch (error) {
            // Fallback to plain text if description is not valid JSON
            contentState = ContentState.createFromText(
              fetchedBlog.content || ""
            );
          }

          // Create editor state for the blog description
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        } else {
          console.error("No blog found with the given name");
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  return (
    <>
      {blog && (
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
              <Editor editorState={editorState} readOnly={true} toolbarHidden />
            )}
          </div>
          {/* Render other service details here */}
        </div>
      )}
    </>
  );
}