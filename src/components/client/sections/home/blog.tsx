import ErrorSystem from "@/components/common/errors/error-system";
import {LoadingPageComponent} from "@/components/common/loading-page";

import { Button } from "@/components/ui/button";
import { Const } from "@/lib/const";
import { convertHtmlToPlainText } from "@/lib/utils";
import { blogService } from "@/services/blog-service";
import { BlogGetAllQuery } from "@/types/queries/blog-query";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Studio {
    title: string;
    src: string;
    href: string;
}

export function Blog() {
    const router = useRouter();
    const query: BlogGetAllQuery = {
        isFeatured: false,
        isDeleted: false,
        isPagination: true,
        pageSize: 3,
        pageNumber: 1,
    };
    const {data: blogs = [], isLoading, isError, error} = useQuery({
        queryKey: ["fetchBlogs", query],
        queryFn: async () => {
            const response = await blogService.fetchAll(query);
            return response.data?.results;
        },
    });

if (isLoading) return <LoadingPageComponent/>;

    if (isError) {
        console.log("Error fetching:", error);
        return <ErrorSystem/>;
    }

    return (
        <div className="py-20 bg-neutral-100">
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
                            Kinh nghiệm cưới
                        </h2>
                        <p className="text-center pb-6 tracking-widest text-xs uppercase font-[100] text-neutral-600 dark:text-neutral-200">
                        </p>
                    </motion.div>
                    <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {blogs.map((ser) => (
                            <div key={ser.id} className="relative bg-white rounded-none hover:shadow-lg">
                                <div className="overflow-hidden rounded-none">
                                    <motion.div
                                        className=""
                                        whileHover={{scale: 1.1}}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <Link href={"/blogs/" + ser.slug}>
                                            <Image
                                                className="aspect-square w-full bg-gray-200 rounded-none object-cover lg:aspect-auto size-1/2"
                                                alt={""}
                                                src={
                                                    ser.thumbnail ? ser.thumbnail : "/image-notfound.jpg"
                                                }
                                                width={9999}
                                                height={9999}
                                            />
                                        </Link>
                                    </motion.div>
                                </div>
                                <div className="m-4 flex flex-col gap-1 justify-between">
                                    <p className="text-lg font-medium w-full text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                                        <Link href={"/blogs/" + ser.slug}>{ser.title}</Link>
                                    </p>
                                    <hr className="border-t border-neutral-300 my-1"/>
                                    {" "}
                                    <p className="text-sm line-clamp-2 w-full text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                                        {ser.content ? convertHtmlToPlainText(ser.content) : "N/A"}
                                    </p>
                                    <p className="text-end">
                                        <Link href={"/blogs/" + ser.slug}> <Button variant="link">Đọc tiếp</Button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex pt-5 justify-center">
                        <button
                            onClick={() => router.push(Const.BLOG)}
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
