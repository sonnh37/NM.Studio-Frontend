"use client";
import { Service } from "@/types/service";
import { ServiceForm } from "@/components/dashboard/sections/services/create-update-form";
import { serviceService } from "@/services/service-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ErrorPage from "@/app/error/404/page";
import LoadingPage from "@/components/common/loading-page";
import ErrorSystem from "@/components/common/errors/error-system";

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
      const response = await serviceService.fetchById(
        params.serviceId as string
      );
      return response.data;
    },
    enabled: !!params.serviceId,
  });

  if (isLoading) return <LoadingPage />;

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
