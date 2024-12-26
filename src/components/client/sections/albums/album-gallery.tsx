"use client";

import { Const } from "@/lib/const";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ErrorPage from "@/app/error/404/page";
import ErrorSystem from "@/components/common/errors/error-system";
import LoadingPage from "@/components/common/loading-page";
import { isError } from "util";

export function AlbumGallery() {
  const pathName = usePathname();

  const queryAlbum: AlbumGetAllQuery = {
    isPagination: true,
    isDeleted: false,
    pageSize: pathName === `/${Const.ALBUM}` ? 60 : 16,
  };

  const {
    data: albums = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchAlbums", queryAlbum],
    queryFn: async () => {
      const response = await albumService.fetchAll(queryAlbum);
      const result = response.data?.results ?? [];
      return result;
    },
  });
  if (isLoading) return <LoadingPage />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="my-3 grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-4">
      {albums!.map((album) => {
        const path = "/albums/" + album.slug;
        return (
          <Link href={path} key={album.slug}>
            <div className="relative h-[400px] isolate flex flex-col justify-end overflow-hidden rounded-none px-8 pb-8 pt-40">
              <motion.div
                className="absolute inset-0 w-full overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <Image
                  alt="image"
                  src={album.background ?? "/image-notfound.jpg"}
                  width={9999}
                  height={9999}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/5"></div>
              </motion.div>

              <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                {album.title}
              </h3>
              <div className="z-10 bottom-8 truncate gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                {album.description}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
