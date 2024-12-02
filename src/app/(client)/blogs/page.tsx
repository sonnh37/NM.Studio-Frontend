"use client";

import { Pagination } from "@/components/client/common/pagination";
import { BlogsRecent } from "@/components/client/sections/blogs/blogs-recent";
import { Button } from "@/components/ui/button";
import { convertJsonToPlainText, formatDate } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blog";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, SetQuery] = useState<BlogGetAllQuery>({
    isPagination: true,
    pageSize: 6,
    pageNumber: 1,
    isFeatured: false,
    isDeleted: [false],
    isNotNullSlug: true,
  });
  const [totalPages, setTotalPages] = useState(1);
  const pageNumber = parseInt(searchParams.get("page") || "1", 10);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    SetQuery((prev) => ({
      ...prev,
      pageNumber: pageNumber,
    }));
  }, [pageNumber]);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        const response = await blogService.fetchAll(query);

        console.log("check_", response);
        setBlogs(response.data!.results || []);
        setTotalPages(response.data!.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, [query]);

  const pathname = usePathname();
  return (
    <>
      <div className="container mx-auto py-16 grid gap-8 grid-cols-3 ">
        <div className="grid col-span-2 ">
          {/* Nội dung bên trái */}
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div className="grid grid-cols-5 max-h-[25rem] bg-neutral-100">
                <div className="grid col-span-3 max-h-[25rem]">
                  <Link href={pathname+"/"+blog.slug}>
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
                      title={blog.title}
                    >
                      <Link href={pathname+"/"+blog.slug}>{blog.title ?? "N/A"}</Link>
                    </p>
                    <p className="line-clamp-5 leading-7 text-gray-500 inset-4">
                      {blog.content
                        ? convertJsonToPlainText(blog.content)
                        : "N/A"}
                    </p>
                    <p>
                      <Button className="p-0 m-0" variant="link" asChild>
                        <Link href={pathname+"/"+blog.slug}>Đọc thêm</Link>
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
