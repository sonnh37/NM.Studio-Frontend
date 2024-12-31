"use client";
import { DisplayContent } from "@/components/client/common/display-content";
import { ServiceCard } from "@/components/client/sections/services/service-card";
import ErrorSystem from "@/components/common/errors/error-system";
import { LoadingPageComponent } from "@/components/common/loading-page";
import { TypographyH2 } from "@/components/common/typography/typography-h2";
import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/lib/utils";
import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Page({ params }: { params: { serviceId: string } }) {
  const { serviceId } = params;
  const query: ServiceGetAllQuery = {
    isDeleted: false,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: serviceId,
  };

  const {
    data: service = {} as Service,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchService", serviceId],
    queryFn: async () => {
      const response = await serviceService.fetchAll(query);
      return response.data?.results?.[0] as Service;
    },
  });

  const {
    data: relateServices = [] as Service[],
    isLoading: isRelateServicesLoading,
    isError: isRelateServicesError,
    error: error_,
  } = useQuery({
    queryKey: ["fetchServices", service.id],
    queryFn: async () => {
      const query_: ServiceGetAllQuery = {
        isDeleted: false,
        isPagination: true,
        pageSize: 8,
        pageNumber: 1,
      };
      const response = await serviceService.fetchAll(query_);
      const re = response.data?.results!.filter((m) => m.id != service.id);
      return re;
    },
    enabled: !!service.id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  if (isRelateServicesLoading) return <LoadingPageComponent />;
  if (isRelateServicesError) {
    console.log("Error fetching related services:", error_);
    return <ErrorSystem />;
  }

  relateServices.filter((m) => m.id != service.id);

  return (
    <>
      {service && (
        <div className="container overflow-x-hidden mx-auto py-8 space-y-8">
          <div className="grid justify-center gap-2 ">
            <h1 className="text-4xl text-center">{service.name}</h1>
            <div className="flex flex-row justify-center gap-4">
              <p className="text-gray-500 text-sm">
                {service.createdBy ?? "Admin"}
              </p>
              <p className="text-gray-500 text-sm">|</p>
              <p className="text-gray-500 text-sm">
                {formatDate(service.createdDate)}
              </p>
            </div>
          </div>
          <div className="md:px-56">
            <DisplayContent value={service.description ?? ""} />
            <Separator />

            <div className="py-6 gap-4 space-y-4">
              <TypographyH2 className="tracking-wider uppercase inline-block">
                Dịch vụ khác
              </TypographyH2>
              {/* Relate */}
              <Swiper
                className="relate-swiper"
                spaceBetween={15}
                slidesPerView={1}
                slidesPerGroup={1}
                loop={false}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Scrollbar, Navigation]}
                style={
                  {
                    "--swiper-navigation-color": "#000", // Màu nút điều hướng
                    "--swiper-pagination-color": "#000", // Màu chấm phân trang
                    "--swiper-navigation-size": "20px",
                    // "--swiper-navigation-sides-offset": "-10px",
                  } as React.CSSProperties
                }
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                  },
                  768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                }}
              >
                {relateServices.map((service_, index) => (
                  <SwiperSlide key={index}>
                    <ServiceCard service={service_} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
