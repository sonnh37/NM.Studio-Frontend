"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { SizeForm } from "@/components/sites/dashboard/sites/sizes/create-update-form";
import { sizeService } from "@/services/size-service";
import { Size } from "@/types/entities/size";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as Size,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchSizeById", params.sizeId],
    queryFn: async () => {
      const response = await sizeService.getById(params.sizeId as string);
      return response.data;
    },
    enabled: !!params.sizeId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <SizeForm initialData={data} />
    </div>
  );
}
