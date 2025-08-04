"use client";
import { MediaFile } from "@/types/entities/media-file";
import { useEffect, useState } from "react";
import { mediaFileService } from "@/services/media-file-service";
import { toast } from "sonner";
import { PhotoForm } from "@/components/dashboard/sites/media-files/create-update-form";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import ErrorSystem from "@/components/_common/errors/error-system";

export default function Page() {
  const params = useParams();
  const {
    data = {} as MediaFile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchPhotoById", params.photoId],
    queryFn: async () => {
      const response = await mediaFileService.getById(params.photoId as string);
      return response.data;
    },
    enabled: !!params.photoId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <PhotoForm initialData={data} />
    </div>
  );
}
