"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { MediaBaseForm } from "@/components/sites/dashboard/sites/media-files/create-update-form";
import { HomeSlideForm } from "@/components/sites/dashboard/sites/media-files/home-slides/create-update-form";
import { homeSlideService } from "@/services/home-slide-service";
import { mediaBaseService } from "@/services/media-base-service";
import { HomeSlide } from "@/types/entities/home-slide";
import { MediaBase } from "@/types/entities/media-base";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as HomeSlide,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchSlideById", params.slideId],
    queryFn: async () =>
      homeSlideService.getById(params.slideId as string, ["slide"]),
    enabled: !!params.slideId,
    select: (result) => result.data,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <HomeSlideForm initialData={data} />
    </div>
  );
}
