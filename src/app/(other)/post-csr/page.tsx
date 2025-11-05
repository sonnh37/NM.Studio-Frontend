"use client";
import PostContent from "@/components/_common/tiptaps_v2/shared/post-content";
import PostHeader from "@/components/_common/tiptaps_v2/shared/post-header";
import PostSharing from "@/components/_common/tiptaps_v2/shared/post-sharing";
import PostToc from "@/components/_common/tiptaps_v2/shared/post-toc";
import PostReadingProgress from "@/components/_common/tiptaps_v2/shared/reading-progress";
import TiptapRenderer from "@/components/_common/tiptaps_v2/tiptap-renderer/client-renderer";
import { usePost } from "@/hooks/tiptaps_v2/use-post";
import Image from "next/image";

export default function PostPage() {
  const { post } = usePost();

  if (!post) return null;

  return (
    <article className="py-10 px-6 flex flex-col items-center ">
      <PostReadingProgress />
      <PostHeader
        title={post.title}
        author={post.author}
        createdAt={post.createdAt}
        readingTime={post.readingTime}
        cover={post.cover}
      />
      <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-8">
        <PostSharing />
        <PostContent>
          <TiptapRenderer>{post.content}</TiptapRenderer>
        </PostContent>
        <PostToc />
      </div>
    </article>
  );
}
