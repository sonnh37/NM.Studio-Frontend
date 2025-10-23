"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { CarouselApi } from "@/components/ui/carousel";
import { homeSlideService } from "@/services/home-slide-service";
import { mediaBaseService } from "@/services/media-base-service";
import { SortDirection } from "@/types/cqrs/queries/base/base-query";
import { HomeSlideGetAllQuery } from "@/types/cqrs/queries/home-slide-query";
import { MediaBaseGetAllQuery } from "@/types/cqrs/queries/media-file-query";
import { HomeSlide } from "@/types/entities/home-slide";
import { MediaBase } from "@/types/entities/media-base";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  Zoom,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Hero() {
  // const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const query: HomeSlideGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageSize: 10,
      pageNumber: 1,
    },
    sorting: {
      sortField: "displayOrder",
      sortDirection: SortDirection.Ascending,
    },
    isDeleted: false,
    includeProperties: ["slide"],
  };

  // React.useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchPhotosHero", query],
    queryFn: () => homeSlideService.getAll(query),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching hero:", error);
    return <ErrorSystem />;
  }

  const photos =
    data?.data?.results
      .map((n) => n.slide)
      .filter((n): n is MediaBase => n !== undefined) ?? [];

  return (
    <div className="">
      <Swiper
        spaceBetween={2}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Scrollbar, Pagination, Navigation]}
        className="mySwiper"
        style={
          {
            "--swiper-navigation-color": "#000", // Màu nút điều hướng
            "--swiper-pagination-color": "#000", // Màu chấm phân trang
            // "--swiper-pagination-bullet-size": "14px", // Kích thước chấm
            // "--swiper-pagination-bullet-horizontal-gap": "8px", // Khoảng cách giữa các chấm
            "--swiper-navigation-size": "20px",
            "--swiper-pagination-bottom": "20px",
            // "--swiper-pagination-bullet-active-background": "#717271", // Màu nền khi active
            // "--swiper-pagination-bullet-active-width": "36px", // Độ rộng chấm khi active
            // "--swiper-pagination-bullet-radius": "14px", // Border radius cho bullet (chấm tròn)
          } as React.CSSProperties
        }
      >
        {photos.map((pic, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <Image
                className="md:h-[calc(100vh-96px)] w-full"
                width={9999}
                height={9999}
                alt={pic.title ?? ""}
                src={pic.mediaUrl ?? "/image-notfound.png"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
