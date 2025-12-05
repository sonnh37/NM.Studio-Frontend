import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";

import { Button } from "@/components/ui/button";
import { Constants } from "@/lib/constants/constants";
import { blogService } from "@/services/blog-service";
import { BlogGetAllQuery } from "@/types/cqrs/queries/blog-query";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { convertHtmlToPlainText } from "@/lib/utils/rich-editor-utils";

export function Blog() {
  const router = useRouter();

  const query: BlogGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 3,
    },
    sorting: {
      sortDirection: 1,
      sortField: "createdDate",
    },
    includeProperties: ["thumbnail"],
    isDeleted: false,
  };
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchBlogs", query],
    queryFn: async () => {
      const response = await blogService.getAll(query);
      return response.data?.results;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="py-20 bg-neutral-50 h-full sm:min-h-screen">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="container mx-auto w-full relative overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="div"
          >
            <h2 className="text-center tracking-wide uppercase text-2xl text-neutral-700 my-2">
              <span className="border-b">Kinh nghiệm cưới</span>
            </h2>
            <p className="text-center pb-6 tracking-widest text-xs uppercase font-thin text-neutral-600 dark:text-neutral-200"></p>
          </motion.div>
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 items-stretch">
            {blogs.map((ser) => (
              <motion.div
                key={ser.id}
                className="relative bg-white rounded-none hover:shadow-lg flex flex-col h-full"
                // whileHover={{ y: -5 }}
                // transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={"/blogs/" + ser.slug}>
                      <Image
                        className="w-full bg-gray-200 object-cover max-h-64 min-h-64"
                        alt=""
                        src={ser.thumbnail?.mediaUrl ?? "/image-notfound.png"}
                        width={9999}
                        height={9999}
                      />
                    </Link>
                  </motion.div>
                </div>

                <div className="m-4 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-lg font-medium text-neutral-700 line-clamp-2">
                      <Link href={"/blogs/" + ser.slug}>{ser.title}</Link>
                    </p>
                    <hr className="border-t border-neutral-300 my-1" />
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {ser.content
                        ? convertHtmlToPlainText(ser.content)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-end mt-2">
                    <Link href={"/blogs/" + ser.slug}>
                      <Button variant="link">Đọc tiếp</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex pt-5 justify-center">
            <button
              onClick={() => router.push(Constants.BLOGS)}
              className="border-2 border-neutral-300 text-neutral-500 px-12 py-4 rounded-none tracking-widest uppercase bg-transparent hover:bg-neutral-500 hover:text-white dark:text-neutral-200 transition duration-200"
            >
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
