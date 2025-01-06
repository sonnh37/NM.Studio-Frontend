"use client";
import { Photo } from "@/types/photo";
import { useEffect, useState } from "react";
import { photoService } from "@/services/photo-service";
import { toast } from "sonner";
import { PhotoForm } from "@/components/dashboard/sites/photos/create-update-form";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import ErrorSystem from "@/components/_common/errors/error-system";

export default function Page() {
  const params = useParams();
  const {
    data = {} as Photo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchPhotoById", params.photoId],
    queryFn: async () => {
      const response = await photoService.fetchById(params.photoId as string);
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
