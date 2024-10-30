// Album.tsx
"use client";

import type { Album } from "@/types/album";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { albumService } from "@/services/album-service";
import { toSlug } from "@/lib/slug-helper";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlbumGallery } from "../albums/album-gallery";

export function AlbumHome() {
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
    <div className="py-10">
      <div className="flex flex-row h-[50px] items-center justify-center  relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
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
            }}
            className="div"
          >
            <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Album
            </h2>
            <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              Với đa màu sắc, đầy phong cách đến từ nhà NhuMyStudio
            </p>
          </motion.div>
        </div>
      </div>
      <AlbumGallery/>
      <div className="flex pt-10 justify-center">
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Xem thêm
        </button>
      </div>
    </div>
  );
}
