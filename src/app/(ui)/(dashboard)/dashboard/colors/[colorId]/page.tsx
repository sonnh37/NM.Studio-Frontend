"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { ColorForm } from "@/components/sites/dashboard/sites/colors/create-update-form";
import { colorService } from "@/services/color-service";
import { Color } from "@/types/entities/color";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as Color,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchColorById", params.colorId],
    queryFn: async () => {
      const response = await colorService.getById(params.colorId as string);
      return response.data;
    },
    enabled: !!params.colorId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <ColorForm initialData={data} />
    </div>
  );
}
