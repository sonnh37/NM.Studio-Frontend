"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { ServiceBookingForm } from "@/components/sites/dashboard/sites/service-bookings/create-update-form";
import { serviceBookingService } from "@/services/service-booking-service";
import { ServiceBooking } from "@/types/entities/service-booking";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const {
    data = {} as ServiceBooking,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchServiceBookingById", params.serviceBookingId],
    queryFn: async () => {
      const response = await serviceBookingService.getById(
        params.serviceBookingId as string
      );
      return response.data;
    },
    enabled: !!params.serviceBookingId,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="space-y-6">
      <ServiceBookingForm initialData={data} />
    </div>
  );
}
