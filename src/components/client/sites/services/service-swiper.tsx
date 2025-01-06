import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";

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

export function ServiceSwiper() {
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
    <Swiper
      spaceBetween={15}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
      //navigation={true}
      modules={[Scrollbar, Pagination, Navigation]}
      className="service-swiper"
      style={
        {
          "--swiper-navigation-color": "#000", // Màu nút điều hướng
          "--swiper-pagination-color": "#000", // Màu chấm phân trang
          // "--swiper-pagination-bullet-size": "14px", // Kích thước chấm
          // "--swiper-pagination-bullet-horizontal-gap": "8px", // Khoảng cách giữa các chấm
          "--swiper-navigation-size": "20px",
          paddingBottom: "40px",
          // "--swiper-pagination-bullet-active-background": "#717271", // Màu nền khi active
          // "--swiper-pagination-bullet-active-width": "36px", // Độ rộng chấm khi active
          // "--swiper-pagination-bullet-radius": "14px", // Border radius cho bullet (chấm tròn)
        } as React.CSSProperties
      }
      breakpoints={{
        640: {
          slidesPerView: 1, // Mobile
        },
        768: {
          slidesPerView: 2, // Tablet
        },
        1024: {
          slidesPerView: 3, // Desktop nhỏ
        },
        1280: {
          slidesPerView: 4, // Desktop lớn
        },
      }}
    >
      {services.map((service, index) => (
        <SwiperSlide key={index}>
          <ServiceCard service={service} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
