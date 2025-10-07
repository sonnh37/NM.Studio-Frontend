"use client"
import { AnimatedTestimonialsPhotos } from "@/components/sites/client/common/animated-testimonials-photos";
import ErrorSystem from "@/components/_common/errors/error-system";
import {LoadingPageComponent} from "@/components/_common/loading-page";

import { convertToISODate } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { MediaBase } from "@/types/entities/media-file";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AlbumImageGallery from "./album-image-gallery";

export function AlbumGallery() {
  const { slug } = useParams();

  const query: AlbumGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 1,
    },

    slug: slug.toString(),
    isDeleted: false,
  };

  const {
    data: album,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchAlbum", query],
    queryFn: async () => {
      const response = await albumService.getAll(query);
      const result = response.data?.results ?? [];
      return result[0];
    },
    enabled: !!slug,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  const photos = album?.albumImages
    ? album.albumImages
        .map((x) => x.mediaBase)
        .filter((mediaBase): mediaBase is MediaBase => mediaBase !== undefined)
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
      <AlbumImageGallery photos={photos} />
    </div>
  );
}
