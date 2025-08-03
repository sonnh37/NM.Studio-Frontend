"use client";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { TypographyH2 } from "@/components/_common/typography/typography-h2";
import { ServiceCard } from "@/components/client/sites/services/service-card";
import { Separator } from "@/components/ui/separator";

import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { Service } from "@/types/entities/service";
import { useQuery } from "@tanstack/react-query";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import PostContent from "@/components/shared/PostContent";
import PostHeader from "@/components/shared/PostHeader";
import PostReadingProgress from "@/components/shared/PostReadingProgress";
import PostSharing from "@/components/shared/PostSharing";
import PostToc from "@/components/shared/PostToc";
import TiptapRenderer from "@/components/TiptapRenderer/ClientRenderer";
import Image from "next/image";
import { useMemo } from "react";
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
      const response = await serviceService.getAll(query);
      return response.data?.results?.[0] as Service;
    },
  });

  const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).length;
  };

  const readingTime = useMemo(() => {
    const wpm = 150; // từ mỗi phút
    const wordCount = getWordCount(service.description ?? "");
    return Math.ceil(wordCount / wpm);
  }, [service.description]);

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
      const response = await serviceService.getAll(query_);
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

  if (!service) return null;

  if (isRelateServicesLoading) return <LoadingPageComponent />;
  if (isRelateServicesError) {
    console.log("Error fetching related services:", error_);
    return <ErrorSystem />;
  }

  relateServices.filter((m) => m.id != service.id);

  return (
    <>
      <article className="py-10 px-6 flex flex-col items-center ">
        <PostReadingProgress />
        <PostHeader
          avatar={"/image-notfound.jpg"}
          title={service.name ?? "Đang cập nhật..."}
          author={service.createdBy ?? "N/A"}
          createdAt={service.createdDate?.toLocaleString() ?? "N/A"}
          readingTime={readingTime}
          cover={service.src ?? "/image-notfound.jpg"}
        />
        <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-8">
          <PostSharing />
          <PostContent>
            <TiptapRenderer>
              {service.description ?? "Đang cập nhật..."}
            </TiptapRenderer>
          </PostContent>
          <PostToc />
        </div>
        <Image
          src={"/doraemon.png"}
          width={350}
          height={350}
          alt=""
          className="mx-auto mt-20"
        />
      </article>
      <div className="container mx-auto">
        <Separator/>
      </div>

      <div className="py-6 container mx-auto gap-4 space-y-4">
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
    </>
  );
}
