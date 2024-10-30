"use client";

import { Const } from "@/lib/const";
import { toSlug } from "@/lib/slug-helper";
import { albumService } from "@/services/album-service";
import type { Album } from "@/types/album";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="pt-10 w-full relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {albums.map((album) => {
        const path = "/albums/" + album.id + "/photos";
        return (
          //   <Card
          //   shadow="sm"
          //   key={index}
          //   isPressable
          //   onPress={() => console.log("item pressed")}
          // >
          //   <CardBody className="overflow-visible p-0">
          //     <Image
          //       isZoomed
          //       shadow="sm"
          //       radius="lg"
          //       width="100%"
          //       alt={item.name}
          //       className="w-full object-cover h-[500px]"
          //       src={
          //         item.productXPhotos.length > 0 && item.productXPhotos[0].photo
          //           ? item.productXPhotos[0].photo.src
          //           : "/path/to/default/image.jpg"
          //       } // Sử dụng hình ảnh mặc định nếu không có
          //     />
          //   </CardBody>
          //   <CardFooter className="text-small justify-between">
          //     <b>{item.name}</b>
          //     <p className="text-default-500">{item.price}</p>
          //   </CardFooter>
          // </Card>
          <div
            key={album.id}
            className="relative bg-gray-50 rounded-none dark:bg-black overflow-hidden"
          >
            <Link href={path}>
              <Card
                shadow="sm"
                className="rounded-none"
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible z-10 p-0">
                  <motion.div
                    className="w-[25rem] h-[20rem] overflow-hidden"
                    whileHover={{ scale: 1.1 }} // Tạo hiệu ứng zoom
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Image
                      alt="image"
                      src={album.background ?? ""} // Hình ảnh nền
                      width={300}
                      height={300}
                      className="object-cover  w-full h-full"
                    />
                  </motion.div>
                </CardBody>
                <CardFooter className="text-small z-20 bg-background  text-gray-500 justify-center">
                  <p>{album.title}</p>
                </CardFooter>
              </Card>
              {/* Bọc motion.div trong Link */}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
