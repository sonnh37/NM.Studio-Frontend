import { formatDate } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/entities/blog";
import { BlogGetAllQuery } from "@/types/cqrs/queries/blog-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function BlogsRecent() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchData = async () => {
    try {
      const request: BlogGetAllQuery = {
        pagination: {
          isPagingEnabled: true,
          pageNumber: 1,
          pageSize: 5,
        },
        // isFeatured: false,
        includeProperties: ["thumbnail"],

        isDeleted: false,
      };
      const res = await blogService.getAll(request);
      setBlogs(res.data?.results ?? []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const pathname = usePathname();
  return (
    <div>
      <p className="font-bold h-fit">Các bài báo gần đây</p>
      <div className="pt-4 space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="grid gap-4 grid-cols-3 max-h-[5rem]">
            <div className="grid col-span-1">
              <Link href={pathname + "/" + blog.slug}>
                <Image
                  alt={blog.title ?? ""}
                  className="h-[5rem] object-cover"
                  src={blog.thumbnail?.mediaUrl ?? "/image-notfound.png"}
                  height={9999}
                  width={9999}
                />
              </Link>
            </div>
            <div className="grid max-h-[5rem] col-span-2 overflow-hidden">
              <div className="flex flex-col justify-between ">
                <p className="text-gray-500 text-sm">
                  {formatDate(blog.createdDate)}
                </p>
                <p
                  className="line-clamp-2 text-base text-gray-700 font-extralight"
                  title={blog.title ?? "N/A"}
                >
                  <Link href={pathname + "/" + blog.slug}>
                    {blog.title ?? "N/A"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
