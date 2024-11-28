"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BookingModal } from "@/components/client/common/animated-modal";
import { useEffect, useState } from "react";
import { photoService } from "@/services/photo-service";
import { PhotoGetAllQuery } from "@/types/queries/photo-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Zoom, Autoplay, Pagination, Navigation } from "swiper/modules";
export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const people = [
    {
      id: 1,
      name: "Nhung CEO",
      designation: "Chủ tịm",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Thy eo vì",
      designation: "Nhân viên",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Bé iu",
      designation: "Nhân viên",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Duyên xi ba",
      designation: "Nhân viên",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Hân",
      designation: "Nhân viên",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "My",
      designation: "Nhân viên",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];

  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: PhotoGetAllQuery = {
          isPagination: true,
          pageSize: 10,
          pageNumber: 1,
          isFeatured: true,
          isDeleted: [false],
        };
        const response = await photoService.fetchAll(query);
        const photos = response.data?.results ?? [];

        const photos_links = photos.map((m) => m.src ?? "") ?? [];
        console.log("check_loadedphotos", photos_links);
        setImages(photos_links);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false); // Dữ liệu đã tải xong, dừng trạng thái loading
      }
    };

    fetchData(); // Gọi hàm async
  }, []);

  // Nếu đang tải dữ liệu, hiển thị loader
  if (loading) {
    return <div>Loading...</div>; // Bạn có thể thay thế bằng một component loading đẹp hơn
  }
  return (
    <div className="">
      {/* <ImagesSlider className="h-screen" images={images} /> */}
      <Swiper
     
        spaceBetween={2}
        slidesPerView={1}
        centeredSlides={true}
        zoom={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Zoom, Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {images.map((pic, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <Image
                className="h-[calc(100vh-100px)] w-full"
                width={9999}
                height={9999}
                alt={""}
                src={pic}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Carousel 
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      >
        <CarouselContent>
          {images.map((pic, index) => (
            <CarouselItem key={index}>
              <Card className="border-none">
                <CardContent className="flex p-0 m-0 border-none">
                  <Image
                    className="h-[calc(100vh-80px)] w-full object-cover"
                    width={9999}
                    height={9999}
                    alt={""}
                    src={pic}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-100 bg-opacity-40 rounded-lg border-none shadow-lg z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-100 bg-opacity-40 rounded-lg border-none shadow-lg z-10" />
      </Carousel> */}
    </div>
  );
}
