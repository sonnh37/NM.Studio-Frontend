"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import ErrorSystem from "@/components/_common/errors/error-system";
import { MediaBaseForm } from "@/components/sites/dashboard/sites/media-files/create-update-form";
import { mediaBaseService } from "@/services/media-base-service";
import { MediaBase } from "@/types/entities/media-base";

export default function Page() {
  const params = useParams();
  const {
    data = {} as MediaBase,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchPhotoById", params.photoId],
    queryFn: async () => {
      const response = await mediaBaseService.getById(params.photoId as string);
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
      <MediaBaseForm initialData={data} />
    </div>
  );
}
