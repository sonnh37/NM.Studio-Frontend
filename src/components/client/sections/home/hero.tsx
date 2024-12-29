"use client";
import {CarouselApi} from "@/components/ui/carousel";
import {photoService} from "@/services/photo-service";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {Autoplay, Navigation, Pagination, Scrollbar, Zoom,} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

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
    

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query: PhotoGetAllQuery = {
                    isPagination: true,
                    pageSize: 100,
                    pageNumber: 1,
                    isFeatured: true,
                    isDeleted: false,
                };
                const response = await photoService.fetchAll(query);
                const photos = response.data?.results ?? [];

                const photos_links = photos.map((m) => m.src ?? "") ?? [];
                setImages(photos_links);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchData(); // Gọi hàm async
    }, []);

    return (
        <div className="">
            {/* <ImagesSlider className="h-screen" images={images} /> */}
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
                        "--swiper-pagination-bottom": "20px"
                        // "--swiper-pagination-bullet-active-background": "#717271", // Màu nền khi active
                        // "--swiper-pagination-bullet-active-width": "36px", // Độ rộng chấm khi active
                        // "--swiper-pagination-bullet-radius": "14px", // Border radius cho bullet (chấm tròn)
                    } as React.CSSProperties
                }
            >
                {images.map((pic, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-zoom-container">
                            <Image
                                className="md:h-[calc(100vh-96px)] w-full"
                                width={9999}
                                height={9999}
                                alt={""}
                                src={pic}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
