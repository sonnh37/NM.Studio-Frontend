"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { homeSlideService } from "@/services/home-slide-service";
import { SortDirection } from "@/types/cqrs/queries/base/base-query";
import { HomeSlideGetAllQuery } from "@/types/cqrs/queries/home-slide-query";
import { MediaBase } from "@/types/entities/media-base";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchPhotosHero", query],
    queryFn: () => homeSlideService.getAll(query),
    refetchOnWindowFocus: false,
  });

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching hero:", error);
    return <ErrorSystem />;
  }

  const photos =
    data?.data?.results
      .map((n) => n.slide)
      .filter((n): n is MediaBase => n !== undefined) ?? [];

  if (photos.length === 0) {
    return (
      <div className="h-[60vh] md:h-[calc(100vh-80px)] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm tracking-wide">
          Không có hình ảnh để hiển thị
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={300}
        pagination={{
          clickable: true,
        }}
        navigation={!isMobile} // Chỉ hiện navigation trên desktop
        modules={[Autoplay, Scrollbar, Pagination, Navigation]}
        className="w-full"
        style={
          {
            "--swiper-navigation-color": "rgba(255, 255, 255, 0.8)",
            "--swiper-pagination-color": "rgba(255, 255, 255, 0.8)",
            "--swiper-navigation-size": "32px",
            "--swiper-pagination-bottom": isMobile ? "16px" : "32px",
            "--swiper-pagination-bullet-size": isMobile ? "8px" : "12px",
            "--swiper-pagination-bullet-inactive-color":
              "rgba(255, 255, 255, 0.3)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-active-color": "#ffffff",
          } as React.CSSProperties
        }
      >
        {photos.map((pic, index) => (
          <SwiperSlide key={index}>
            {/* Image Container - Full height trên desktop, trừ navbar */}
            <div className="relative h-[60vh] md:h-[calc(100vh-80px)] w-full overflow-hidden">
              <Image
                src={pic.mediaUrl ?? "/image-notfound.png"}
                alt={pic.title ?? `Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={95}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/10 md:bg-black/5" />

              {/* Subtle Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Decorative line chỉ trên desktop */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-300/50 to-transparent z-20" />
      )}
    </div>
  );
}
