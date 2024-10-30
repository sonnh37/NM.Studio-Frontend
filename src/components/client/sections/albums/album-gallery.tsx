"use client";

import { toSlug } from "@/lib/slug-helper";
import { albumService } from "@/services/album-service";
import type { Album } from "@/types/album";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AlbumGallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const pathName = usePathname();
  const serviceGetAllQuery: ServiceGetAllQuery = {
    pageNumber: 1,
    pageSize: 12,
    sortOrder: 1,
    isActive: true,
    isPagination: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await albumService.fetchAll(serviceGetAllQuery);
        const albums = response.data?.results;

        setAlbums(albums!);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-10 w-full relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
      {albums.map((album) => {
        const slug = toSlug(album.title || "");
        const path = "/album/" + slug;
        return (
          <div
            key={album.id}
            className="relative bg-gray-50 rounded-none dark:bg-black overflow-hidden"
          >
            <Link href={path}>
              {" "}
              {/* Bọc motion.div trong Link */}
              <motion.div
                className="w-full h-full"
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
            </Link>
          </div>
        );
      })}
    </div>
  );
}
