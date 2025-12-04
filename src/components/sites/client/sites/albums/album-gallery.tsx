"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { AnimatedTestimonialsPhotos } from "@/components/sites/client/common/animated-testimonials-photos";

import { convertToISODate } from "@/lib/utils/date-utils";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { MediaBase } from "@/types/entities/media-base";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AlbumImageGallery from "./album-image-gallery";
import { Status } from "@/types/models/business-result";
import { toast } from "sonner";

export function AlbumGallery() {
  const { slug } = useParams();
  const slugString = slug ? slug.toString() : "";

  const {
    data: resAlbum,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchAlbum", slugString],
    queryFn: async () => albumService.getBySlug(slugString),
    enabled: !!slugString,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  if (resAlbum?.status == Status.ERROR)
    return toast.error(resAlbum.error?.detail);

  const album = resAlbum?.data;
  const photos = album?.albumImages
    ? album.albumImages
        .map((x) => x.image)
        .filter((mediaBase): mediaBase is MediaBase => mediaBase !== undefined)
    : [];

  return (
    <div className="container py-4 mx-auto">
      <div className="flex flex-col justify-center mx-auto pb-8 gap-4">
        <div className="flex flex-col mx-auto justify-center">
          <h2 className="text-4xl text-center relative z-20">{album?.title}</h2>
          <p className="w-full text-center text-base md:text-xs font-normal text-neutral-500 dark:text-neutral-200 mt-2 mx-auto pb-5">
            Ngày tạo: {convertToISODate(album?.createdDate!)?.toString()}
          </p>
        </div>

        <div>
          <AnimatedTestimonialsPhotos autoplay={false} photos={photos} />
        </div>
      </div>
      <AlbumImageGallery photos={photos} />
    </div>
  );
}
