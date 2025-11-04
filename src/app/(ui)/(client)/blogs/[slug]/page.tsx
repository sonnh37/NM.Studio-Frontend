"use client";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { getWordCount } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { BlogGetAllQuery } from "@/types/cqrs/queries/blog-query";
import { Blog } from "@/types/entities/blog";
import { useQuery } from "@tanstack/react-query";

import ErrorSystem from "@/components/_common/errors/error-system";
import PostContent from "@/components/_common/tiptaps_v2/shared/post-content";
import PostHeader from "@/components/_common/tiptaps_v2/shared/post-header";
import PostSharing from "@/components/_common/tiptaps_v2/shared/post-sharing";
import PostToc from "@/components/_common/tiptaps_v2/shared/post-toc";
import PostReadingProgress from "@/components/_common/tiptaps_v2/shared/reading-progress";
import TiptapRenderer from "@/components/_common/tiptaps_v2/tiptap-renderer/client-renderer";
import { usePost } from "@/hooks/tiptaps_v2/use-post";
import { useMemo, use } from "react";

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { slug } = params;

  const query: BlogGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 1,
    },
    slug: slug,
    includeProperties: ["thumbnail", "backgroundCover", "author.avatar"],
    isDeleted: false,
    // isFeatured: false,
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
        <PostHeader
          avatar={post.author?.avatar?.mediaUrl ?? "/image-notfound.png"}
          title={post.title ?? "Đang cập nhật..."}
          author={post.author?.fullName ?? "N/A"}
          createdAt={post.createdDate?.toLocaleString() ?? "N/A"}
          readingTime={readingTime}
          cover={post.backgroundCover?.mediaUrl ?? "/image-notfound.png"}
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
