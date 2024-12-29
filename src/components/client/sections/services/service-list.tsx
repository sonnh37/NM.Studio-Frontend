import ErrorSystem from "@/components/common/errors/error-system";
import { LoadingPageComponent } from "@/components/common/loading-page";

import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ServiceCard } from "./service-card";
import { TitleProvider } from "@/components/common/title-component";

export function ServiceList() {
  const router = useRouter();
  const query: ServiceGetAllQuery = {
    isDeleted: false,
    isPagination: true,
    pageSize: 6,
    pageNumber: 1,
  };
  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => {
      const response = await serviceService.fetchAll(query);
      return response.data?.results;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="my-3 container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
}
