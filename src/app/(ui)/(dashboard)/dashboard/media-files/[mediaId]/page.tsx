"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { MediaBaseForm } from "@/components/sites/dashboard/sites/media-files/create-update-form";
import { mediaBaseService } from "@/services/media-base-service";
import { MediaBase } from "@/types/entities/media-base";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as MediaBase,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchMediaBaseById", params.mediaId],
    queryFn: async () => mediaBaseService.getById(params.mediaId as string),
    enabled: !!params.mediaId,
    select: (result) => result.data,
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
