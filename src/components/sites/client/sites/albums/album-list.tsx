"use client";

import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { Constants } from "@/lib/constants/constants";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function AlbumList() {
  const pathName = usePathname();

  const queryAlbum: AlbumGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageSize: pathName === `/${Constants.ALBUMS}` ? 60 : 162,
    },
    isDeleted: false,
  };

  const {
    data: albums = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchAlbums", queryAlbum],
    queryFn: async () => {
      const response = await albumService.getAll(queryAlbum);
      const result = response.data?.results ?? [];
      return result;
    },
  });
  if (isLoading) return <LoadingPageComponent />;

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
                  src={album.coverUrl ?? "/image-notfound.png"}
                  width={9999}
                  height={9999}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/5"></div>
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
