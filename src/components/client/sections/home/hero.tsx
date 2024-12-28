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
                //centeredSlides={true}
                zoom={true}
                autoplay={{
                    delay: 5000,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Zoom, Autoplay, Scrollbar, Pagination, Navigation]}
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
                                className="h-[calc(100vh-96px)] w-full"
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
