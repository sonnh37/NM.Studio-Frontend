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
    return <ErrorPage />;
  }

  const photos = album?.albumXPhotos
    ? album.albumXPhotos
        .map((x) => x.photo)
        .filter((photo): photo is Photo => photo !== undefined)
    : [];

  return (
    <div className="container py-16 mx-auto">
      <div className="flex flex-col justify-center mx-auto pb-8 gap-4">
        <div className="flex flex-col mx-auto justify-center">
          <h2 className="text-4xl text-center relative z-20">{album?.title}</h2>
          <p className="w-full text-center text-base md:text-xs font-normal text-neutral-500 dark:text-neutral-200 mt-2 mx-auto pb-5">
            Ngày tạo: {convertToISODate(album?.createdDate!)?.toString()}
          </p>
        </div>

        <div className="">
          <AnimatedTestimonialsPhotos autoplay={false} photos={photos} />
        </div>
      </div>
      <GalleryContent photos={photos} />
    </div>
  );
}
