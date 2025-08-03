"use client";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { ServiceForm } from "@/components/dashboard/sites/services/create-update-form";
import { serviceService } from "@/services/service-service";
import { Service } from "@/types/entities/service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import ErrorSystem from "@/components/_common/errors/error-system";

export default function Page() {
  const params = useParams();
  const {
    data = {} as Service,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchServiceById", params.serviceId],
    queryFn: async () => {
      const response = await serviceService.getById(
        params.serviceId as string
      );
      return response.data;
    },
    enabled: !!params.serviceId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }
  return (
    <div className="space-y-6">
      <ServiceForm initialData={data} />
    </div>
  );
}
