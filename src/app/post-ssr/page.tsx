import PostHeader from "../../components/_common/shared/PostHeader";
import PostToc from "../../components/_common/shared/PostToc";
import PostContent from "../../components/_common/shared/PostContent";
import PostSharing from "../../components/_common/shared/PostSharing";
import PostReadingProgress from "../../components/_common/shared/PostReadingProgress";
import TiptapRenderer from "@/components/sites/tiptaps/TiptapRenderer/ServerRenderer";
import Image from "next/image";

import { getPost } from "@/services/post";
import { notFound } from "next/navigation";

export default async function PostPage() {
  const post = await getPost();

  if (!post) return notFound();

  const readingTime = Math.ceil(post.wordCount / 150);

  return (
    <article className="py-10 px-6 flex flex-col items-center ">
      <PostReadingProgress />
      <PostHeader
      avatar=""
        title={post.title}
        author={post.author}
        createdAt={post.createdAt}
        readingTime={readingTime}
        cover={post.cover}
      />
      <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-12">
        <PostSharing />
        <PostContent>
          <TiptapRenderer>{post.content}</TiptapRenderer>
        </PostContent>
        <PostToc />
      </div>
      <Image src={"/doraemon.png"} width={350} height={350} alt="" className="mx-auto mt-20" />
    </article>
  );
}
