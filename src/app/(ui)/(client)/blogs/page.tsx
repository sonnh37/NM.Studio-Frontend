"use client";

import { Pagination } from "@/components/sites/client/common/pagination";
import { BlogsRecent } from "@/components/sites/client/sites/blogs/blogs-recent";
import ErrorSystem from "@/components/_common/errors/error-system";
import {LoadingPageComponent} from "@/components/_common/loading-page";
import { TitleProvider } from "@/components/_common/title-component";

import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog-service";
import { BlogGetAllQuery } from "@/types/cqrs/queries/blog-query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {formatDate} from "@/lib/utils/date-utils";
import {convertHtmlToPlainText} from "@/lib/utils/rich-editor-utils";

export default function AlbumPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageNumber = parseInt(searchParams.get("page") || "1", 10);


  const query: BlogGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: pageNumber,
      pageSize: 6,
    },
    includeProperties: ["thumbnail", "backgroundCover", "author"],
    isDeleted: false,
    // isFeatured: false,
  };

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBlogs", query],
    queryFn: async () => {
      const response = await blogService.getAll(query);
      return response;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  const blogs = result?.data?.results ?? [];
  const totalPages = result?.data?.pageCount ?? 1;

  return (
    <TitleProvider title="Kinh nghiệm cưới" className="text-center">
      <div className="container mx-auto py-16 grid gap-8 md:grid-cols-3 ">
        <div className="grid md:col-span-2 ">
          {/* Nội dung bên trái */}
          <div className="space-y-4 md:space-y-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="grid grid-cols-5 max-h-40 md:max-h-full overflow-hidden bg-neutral-100"
              >
                <div className="grid col-span-3 max-h-40 md:max-h-full overflow-hidden">
                  <Link href={pathname + "/" + blog.slug}>
                    <Image
                      alt={blog.title ?? ""}
                      className="h-full w-full object-cover"
                      src={blog.thumbnail?.mediaUrl ?? "/image-notfound.png"}
                      height={9999}
                      width={9999}
                    />
                  </Link>
                </div>
                <div className="grid col-span-2 overflow-hidden">
                  <div className="flex flex-col justify-start space-y-4 p-4 md:p-8">
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
        <div className="hidden md:grid md:col-span-1 ">
          {/* Nội dung bên phải */}
          <BlogsRecent />
        </div>
      </div>
    </TitleProvider>
  );
}
