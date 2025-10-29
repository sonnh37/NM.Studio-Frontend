"use client";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { getWordCount } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { BlogGetAllQuery } from "@/types/cqrs/queries/blog-query";
import { Blog } from "@/types/entities/blog";
import { useQuery } from "@tanstack/react-query";

import ErrorSystem from "@/components/_common/errors/error-system";
import PostContent from "@/components/_common/shared/PostContent";
import PostHeader from "@/components/_common/shared/PostHeader";
import PostReadingProgress from "@/components/_common/shared/PostReadingProgress";
import PostSharing from "@/components/_common/shared/PostSharing";
import PostToc from "@/components/_common/shared/PostToc";
import TiptapRenderer from "@/components/_common/tiptaps/TiptapRenderer/ClientRenderer";
import { useMemo } from "react";
import Image from "next/image";

export default function AboutPage() {
  const query: BlogGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 1,
    },
    includeProperties: ["thumbnail", "backgroundCover", "author.avatar"],
    isDeleted: false,
    isFeatured: true,
  };

  const {
    data: post = {} as Blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBlog"],
    queryFn: async () => blogService.getAll(query),
    select: (data) => data.data?.results?.[0],
  });

  const readingTime = useMemo(() => {
    const wpm = 150;
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
        <div className="lg:max-w-[45rem] mx-auto">
          <h1 className="text-3xl leading-snug md:text-4xl md:leading-normal font-bold">
            {post.title}
          </h1>

          <Image
            src={post.backgroundCover?.mediaUrl ?? "/image-notfound.png"}
            alt={post.title ?? "Image not found"}
            width={1932}
            height={1087}
            className="my-10 rounded-lg"
            priority
          />
        </div>
        <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-8">
          <PostSharing />
          <PostContent>
            <TiptapRenderer>
              {post.content ?? "Đang cập nhật..."}
            </TiptapRenderer>
          </PostContent>
          <PostToc />
        </div>
        {/* <Image
          src={"/doraemon.png"}
          width={350}
          height={350}
          alt=""
          className="mx-auto mt-20"
        /> */}
      </article>
    </>
  );
}
