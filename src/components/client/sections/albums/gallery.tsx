import { AnimatedTestimonialsPhotos } from "@/components/client/common/animated-testimonials-photos";
import { convertToISODate, isValidImage } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { Album } from "@/types/album";
import { Photo } from "@/types/photo";
import { Slide } from "@/types/slide";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import GalleryContent from "./gallery-content";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/app/(client)/error/page";

export function Gallery() {
  const { slug } = useParams();
  const query: AlbumGetAllQuery = {
    isNotNullSlug: true,
    isDeleted: [false],
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: slug.toString(),
  };

  const { data: album, error } = useQuery({
    queryKey: ["fetchAlbum", query],
    queryFn: async () => {
      const response = await albumService.fetchAll(query);
      const result = response.data?.results ?? [];
      return result[0];
    },
    enabled: !!slug,
  });

  if (error) {
    console.log("Error fetching:", error);
    return <ErrorPage/>; 
  }

  const photos = album?.albumXPhotos
    ? album.albumXPhotos
        .map((x) => x.photo)
        .filter((photo): photo is Photo => photo !== undefined)
    : [];

  
  return (
    <div className="container py-16 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="grid content-center">
          <h2 className="text-4xl text-end relative z-20">{album?.title}</h2>
          <p className="text-end w-full text-base md:text-xs font-normal text-neutral-500 dark:text-neutral-200 mt-2 mx-auto pb-5">
            Created date: {convertToISODate(album?.createdDate!)?.toString()}
          </p>
        </div>

        <div className="col-span-4">
          <AnimatedTestimonialsPhotos autoplay={false} photos={photos} />
        </div>
      </div>
      <GalleryContent photos={photos} />
    </div>
  );
}
