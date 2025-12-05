"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { convertToISODate } from "@/lib/utils/date-utils";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { MediaBase } from "@/types/entities/media-base";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AlbumImageGallery from "./album-image-gallery";
import { Status } from "@/types/models/business-result";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

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
    queryFn: () => albumService.getBySlug(slugString),
    enabled: !!slugString,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  if (resAlbum?.status == Status.ERROR) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-gray-600">Không tìm thấy album</p>
      </div>
    );
  }

  const album = resAlbum?.data;
  const photos = album?.albumImages
    ? album.albumImages
        .map((x) => x.image)
        .filter((mediaBase): mediaBase is MediaBase => mediaBase !== undefined)
    : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px w-8 bg-gray-300"></div>
            <div className="h-px w-12 bg-gray-400"></div>
            <div className="h-px w-8 bg-gray-300"></div>
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
            {album?.title}
          </h1>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
            <Calendar className="h-4 w-4" />
            <span className="tracking-wide">
              Ngày tạo: {convertToISODate(album?.createdDate!)?.toString()}
            </span>
          </div>

          {album?.description && (
            <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide mt-6 max-w-2xl mx-auto">
              {album.description}
            </p>
          )}
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <AlbumImageGallery photos={photos} />
        </motion.div>

        {/* Photo Count */}
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center pt-8 border-t border-gray-100"
          >
            <p className="text-sm text-gray-500 tracking-wider">
              {photos.length} HÌNH ẢNH • {album?.title?.toUpperCase()}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
