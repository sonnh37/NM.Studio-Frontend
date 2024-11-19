"use client";

import {Const} from "@/lib/const";
import {albumService} from "@/services/album-service";
import type {Album} from "@/types/album";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {motion} from "framer-motion";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";

export function AlbumGallery() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [queryAlbum, setQueryAlbum] = useState<AlbumGetAllQuery>();
    const router = useRouter();
    const pathName = usePathname();
    useEffect(() => {
        if (pathName == `/${Const.ALBUM}`) {
            setQueryAlbum((prev) => ({
                ...prev,
                isPagination: true,
                pageSize: 60,
            }));
        } else {
            setQueryAlbum((prev) => ({
                ...prev,
                isPagination: true,
                pageSize: 12,
            }));
        }
    }, [pathName]);

    useEffect(() => {
        const fetchData = async () => {
            if (!queryAlbum) return; // Kiểm tra nếu queryAlbum không tồn tại

            try {
                const response = await albumService.fetchAll(queryAlbum);
                const albums_ = response.data!.results;
                setAlbums(albums_ ?? []);
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };

        fetchData();
    }, [queryAlbum]);

    return (
        <div
            className="pt-10 container relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {albums.map((album) => {
                const path = "/albums/" + album.id + "/photos";
                return (


                    // <div
                    //     key={album.id}
                    //     className="relative bg-gray-50 rounded-none dark:bg-black overflow-hidden"
                    // >
                    //     <Link href={path}>
                    //         <Card
                    //             shadow="sm"
                    //             className="rounded-none"
                    //             onPress={() => console.log("item pressed")}
                    //         >
                    //             <CardBody className="overflow-visible z-10 p-0">
                    //                 <motion.div
                    //                     className="w-full h-full overflow-hidden"
                    //                     whileHover={{scale: 1.1}} // Tạo hiệu ứng zoom
                    //                     transition={{
                    //                         duration: 0.3,
                    //                         ease: "easeOut",
                    //                     }}
                    //                 >
                    //                     <Image
                    //                         alt="image"
                    //                         src={album.background ?? ""} // Hình ảnh nền
                    //                         width={300}
                    //                         height={300}
                    //                         className="  w-full h-full object-cover"
                    //                     />
                    //                 </motion.div>
                    //             </CardBody>
                    //             <CardFooter className="text-small z-20 bg-background  text-gray-500 justify-center">
                    //                 <p>{album.title}</p>
                    //             </CardFooter>
                    //         </Card>
                    //         {/* Bọc motion.div trong Link */}
                    //     </Link>
                    // </div>

                    <Link href={path}>
                    <div
                        className="relative h-[400px] isolate flex flex-col justify-end overflow-hidden rounded-md px-8 pb-8 pt-40"
                    >
                        <motion.div
                            className="absolute inset-0 w-full overflow-hidden" // Đặt full kích thước và vị trí
                            whileHover={{scale: 1.1}} // Hiệu ứng zoom khi hover
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                        >
                            <Image
                                alt="image"
                                src={album.background ?? "/image-notfound.jpg"} // Hình ảnh nền
                                width={2000}
                                height={2000}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

                        </motion.div>

                        <h3 className=" z-10 mt-3 text-3xl font-bold text-white">
                            {album.title}
                        </h3>
                        <div
                            className=" z-10 bottom-8 truncate gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                            {album.description}
                        </div>
                    </div>
                    </Link>

                )
                    ;
            })}
        </div>
    );
}
