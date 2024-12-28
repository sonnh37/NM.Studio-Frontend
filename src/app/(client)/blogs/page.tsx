"use client";

import { Pagination } from "@/components/client/common/pagination";
import { BlogsRecent } from "@/components/client/sections/blogs/blogs-recent";
import ErrorSystem from "@/components/common/errors/error-system";
import {LoadingPageComponent} from "@/components/common/loading-page";

import { Button } from "@/components/ui/button";
import { convertHtmlToPlainText, formatDate } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AlbumPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageNumber = parseInt(searchParams.get("page") || "1", 10);

  const query: BlogGetAllQuery = {
    isPagination: true,
    pageSize: 6,
    pageNumber: pageNumber,
    isFeatured: false,
    isDeleted: false,
  };

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBlogs", query],
    queryFn: async () => {
      const response = await blogService.fetchAll(query);
      return response;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  const blogs = result?.data?.results ?? [];
  const totalPages = result?.data?.totalPages ?? 1;

  return (
    <>
      <div className="container mx-auto py-16 grid gap-8 grid-cols-3 ">
        <div className="grid col-span-2 ">
          {/* Nội dung bên trái */}
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="grid grid-cols-5 max-h-[25rem] bg-neutral-100"
              >
                <div className="grid col-span-3 max-h-[25rem]">
                  <Link href={pathname + "/" + blog.slug}>
                    <Image
                      alt={blog.title ?? ""}
                      className="h-[25rem] object-cover"
                      src={blog.thumbnail ?? "/image-notfound.jpg"}
                      height={9999}
                      width={9999}
                    />
                  </Link>
                </div>
                <div className="grid col-span-2 overflow-hidden">
                  <div className="flex flex-col justify-start space-y-4 p-8">
                    <p className="text-gray-500 text-sm">
                      {formatDate(blog.createdDate)}
                    </p>
                    <p
                      className="line-clamp-2 font-extralight text-gray-900 text-lg"
                      title={blog.title ?? "N/A"}
                    >
                      <Link href={pathname + "/" + blog.slug}>
                        {blog.title ?? "N/A"}
                      </Link>
                    </p>
                    <p className="line-clamp-5 leading-7 text-gray-500 inset-4">
                      {blog.content
                        ? convertHtmlToPlainText(blog.content)
                        : "N/A"}
                    </p>
                    <p>
                      <Button className="p-0 m-0" variant="link" asChild>
                        <Link href={pathname + "/" + blog.slug}>Đọc thêm</Link>
                      </Button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        </div>
        <div className="grid col-span-1 ">
          {/* Nội dung bên phải */}
          <BlogsRecent />
        </div>
      </div>
    </>
  );
}
