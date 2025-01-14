"use client";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { DisplayContent } from "@/components/client/common/display-content";
import { createEditorState, formatDate } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blog";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { useQuery } from "@tanstack/react-query";

import ErrorSystem from "@/components/_common/errors/error-system";
import PostReadingProgress from "@/components/shared/PostReadingProgress";
import PostHeader from "@/components/shared/PostHeader";
import PostSharing from "@/components/shared/PostSharing";
import PostContent from "@/components/shared/PostContent";
import PostToc from "@/components/shared/PostToc";
import Image from "next/image";
import { useMemo } from "react";
import TiptapRenderer from "@/components/TiptapRenderer/ClientRenderer";
import { userService } from "@/services/user-serice";

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
    data: post = {} as Blog,
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
  const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).length;
  };

  const readingTime = useMemo(() => {
    const wpm = 150; // từ mỗi phút
    const wordCount = getWordCount(post.content ?? "");
    return Math.ceil(wordCount / wpm);
  }, [post.content]);

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  if (!post) return null;

  return (
    <>
      <article className="py-10 px-6 flex flex-col items-center ">
        <PostReadingProgress />
        <PostHeader
        avatar={"/image-notfound.jpg"}
          title={post.title ?? "Đang cập nhật..."}
          author={post.createdBy ?? "N/A"}
          createdAt={post.createdDate?.toLocaleString() ?? "N/A"}
          readingTime={readingTime}
          cover={post.thumbnail ?? "/image-notfound.jpg"}
        />
        <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-8">
          <PostSharing />
          <PostContent>
            <TiptapRenderer>
              {post.content ?? "Đang cập nhật..."}
            </TiptapRenderer>
          </PostContent>
          <PostToc />
        </div>
        <Image
          src={"/doraemon.png"}
          width={350}
          height={350}
          alt=""
          className="mx-auto mt-20"
        />
      </article>
    </>
  );
}
