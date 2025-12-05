import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";

import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/cqrs/queries/service-query";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { convertHtmlToPlainText } from "@/lib/utils/rich-editor-utils";
import { processResponse } from "@/lib/utils";

interface Studio {
  title: string;
  src: string;
  href: string;
}

export function Service() {
  const router = useRouter();

  const query: ServiceGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 6,
    },
    sorting: {
      sortDirection: 1,
      sortField: "createdDate",
    },
    includeProperties: ["thumbnail"],
    isDeleted: false,
  };

  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => serviceService.getAll(query),
    select: (res) => processResponse(res).results,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <div className="py-20 bg-neutral-50 h-full sm:min-h-screen">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="container mx-auto w-full relative overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-24 max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-6 md:mb-8">
              Dịch Vụ
              <br />
              <span className="italic">Chuyên Nghiệp</span>
            </h1>

            <p className="text-xs md:text-base text-gray-600 tracking-wider md:tracking-widest leading-relaxed font-light px-2 md:px-0">
              Chúng tôi mang đến trọn vẹn từng khoảnh khắc đáng nhớ với dịch vụ
              chụp ảnh cưới toàn diện, từ concept sáng tạo đến hoàn thiện sản
              phẩm
            </p>
          </motion.div>
          <Swiper
            spaceBetween={15}
            slidesPerGroup={1}
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
            {services.map((ser, index) => (
              <SwiperSlide key={index}>
                <div className="relative bg-white pb-10 rounded-none hover:shadow-lg">
                  <div className="overflow-hidden rounded-none">
                    <motion.div
                      className=""
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link href={"/services/" + ser.slug}>
                        <Image
                          className="aspect-square h-[300px] w-full bg-gray-200 rounded-none object-cover lg:aspect-auto size-1/2"
                          alt={""}
                          src={ser.thumbnail?.mediaUrl ?? "/image-notfound.png"}
                          width={9999}
                          height={9999}
                        />
                      </Link>
                    </motion.div>
                  </div>
                  <div className="m-4 flex flex-col gap-1 justify-between">
                    <p className="text-lg font-medium w-full text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                      <Link href={"/services/" + ser.slug}>{ser.name}</Link>
                    </p>
                    <hr className="border-t border-neutral-300 my-1" />{" "}
                    <p className="text-sm line-clamp-2 w-full text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                      {ser.description
                        ? convertHtmlToPlainText(ser.description)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
