"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { AlbumForm } from "@/components/sites/dashboard/sites/albums/create-update-form";
import { processResponse } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { Album } from "@/types/entities/album";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getValidateString } from "@/lib/utils/string-utils";
import { ALBUM_GET_BY_ID_KEY } from "@/components/sites/dashboard/sites/albums/keys/album-key";

export default function Page() {
  const params = useParams();
  const albumId = getValidateString(params.albumId);
  if (!albumId) return <ErrorSystem message="Invalid albumId" />;
  const {
    data = {} as Album,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [ALBUM_GET_BY_ID_KEY, albumId],
    queryFn: () =>
      albumService.getById(albumId as string, ["albumImages.image"]),
    enabled: !!albumId,
    refetchOnWindowFocus: false,
    gcTime: 0,
    select: (result) => processResponse(result),
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <AlbumForm initialData={data} />
    </div>
  );
}
