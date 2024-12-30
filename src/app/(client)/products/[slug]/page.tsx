"use client";
import { DisplayContent } from "@/components/client/common/display-content";
import { ProductCard } from "@/components/client/sections/products/product-card";
import ErrorSystem from "@/components/common/errors/error-system";
import { LoadingPageComponent } from "@/components/common/loading-page";
import { TypographyH2 } from "@/components/common/typography/typography-h2";
import { TypographyLarge } from "@/components/common/typography/typography-large";
import { TypographyP } from "@/components/common/typography/typography-p";
import { TypographySmall } from "@/components/common/typography/typography-small";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { productService } from "@/services/product-service";
import { Color } from "@/types/color";
import { Product } from "@/types/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { Size } from "@/types/size";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import 'swiper/css/effect-fade';
import { FreeMode, Navigation, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import { Separator } from "@/components/ui/separator";
import type { Swiper as SwiperType} from 'swiper';
export default function Page() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const { slug } = useParams();
  const query: ProductGetAllQuery = {
    isDeleted: false,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: slug as string,
  };

  const {
    data: product = {} as Product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchProduct", slug],
    queryFn: async () => {
      const response = await productService.fetchAll(query);
      return response.data?.results?.[0] as Product;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: relateProducts = [] as Product[],
    isLoading: isRelateProductsLoading,
    isError: isRelateProductsError,
    error: error_,
  } = useQuery({
    queryKey: ["fetchProducts", product.id],
    queryFn: async () => {
      const query_: ProductGetAllQuery = {
        isDeleted: false,
        isPagination: true,
        pageSize: 8,
        pageNumber: 1,
        categoryName: product.subCategory?.category?.name,
        subCategoryName: product.subCategory?.name,
      };
      const response = await productService.fetchAll(query_);
      console.log("check_relateproduct", response.data?.results);
      return response.data?.results;
    },
    enabled: !!product.id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;
  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  if (isRelateProductsLoading) return <LoadingPageComponent />;
  if (isRelateProductsError) {
    console.log("Error fetching related products:", error_);
    return <ErrorSystem />;
  }

  const handleSizeChange = (sizeName: string) => {
    const size = product.productXSizes?.find(
      (pxc) => pxc.size?.name === sizeName
    );
    if (size) {
      setSelectedSize(size.size ?? null);
    }
  };

  const handleColorChange = (colorName: string) => {
    const color = product.productXColors?.find(
      (pxc) => pxc.color?.name === colorName
    );
    if (color) {
      setSelectedColor(color.color ?? null);
    }
  };

  return (
    <div className="container md:px-52 py-8 mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Swiper */}
        <div className="md:col-span-1 space-y-1">
          <div className="bg-neutral-700">
            <Swiper
              style={
                {
                  "--swiper-navigation-color": "#000", // Màu nút điều hướng
                  "--swiper-pagination-color": "#000", // Màu chấm phân trang
                  "--swiper-navigation-size": "20px",
                } as React.CSSProperties
              }
              className="!w-[70%] !h-[70%]"
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {product.productXPhotos!.map((pxp, index) => (
                <SwiperSlide key={index}>
                  <img
                    alt={pxp.photo?.title ?? "N/A"}
                    src={pxp.photo?.src ?? "/image-notfound.jpg"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="hidden md:block">
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={5}
              slidesPerView={1}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              effect="fade"
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
              {product.productXPhotos!.map((pxp, index) => (
                <SwiperSlide
                  key={index}
                  className="w-[25%] h-[100%] opacity-40"
                >
                  <img
                    alt={pxp.photo?.title ?? "N/A"}
                    src={pxp.photo?.src ?? "/image-notfound.jpg"}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* Info */}
        <div className="md:col-span-1 p-4 ">
          <div className="space-y-8">
            <TypographyH2>{product.name}</TypographyH2>
            <TypographyP>{product.description}</TypographyP>
            <TypographySmall>
              {product.price ? formatPrice(product.price) : "Đang cập nhật"}
            </TypographySmall>
            <Button className="w-full bg-neutral-500 rounded-none">
              Liên hệ
            </Button>
            {/* Colors */}
            <fieldset aria-label="Choose a color">
              <legend className="text-sm font-medium text-gray-900">
                Color
              </legend>
              <div className="flex flex-row space-x-2 mt-4">
                {product.productXColors?.map((pxc) => (
                  <div key={pxc.id} className="flex flex-col items-center">
                    <Button
                      variant="outline"
                      type="button"
                      className={`h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ease-in-out
          ${
            pxc.isActive
              ? selectedColor?.name === pxc.color?.name // Sử dụng đúng trạng thái để so sánh
                ? "border-indigo-600 ring-2 ring-indigo-500"
                : ""
              : "opacity-50 cursor-not-allowed"
          }`}
                      onClick={() => handleColorChange(pxc.color?.name ?? "")} // Đúng hàm xử lý
                      disabled={!pxc.isActive}
                      style={{
                        backgroundColor: pxc.color?.name ?? "#fff",
                      }} // Sử dụng style để đặt màu động
                    >
                      {/* Bạn có thể thêm nội dung nếu cần */}
                    </Button>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset aria-label="Choose a size" className="mt-10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">Size</div>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>

              <div className="flex flex-row space-x-2 mt-4">
                {product.productXSizes?.map((pxc) => (
                  <div key={pxc.id} className="flex flex-col items-center">
                    <Button
                      variant="outline"
                      type="button"
                      className={`h-10 w-10 rounded-full border-2 
                ${
                  pxc.isActive
                    ? selectedSize?.name === pxc.size?.name
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } 
                flex items-center justify-center text-sm font-medium transition-all duration-200 ease-in-out`}
                      onClick={() => handleSizeChange(pxc.size?.name ?? "")}
                      disabled={!pxc.isActive}
                    >
                      {pxc.size?.name}
                    </Button>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        {/* Description */}
        <TypographyLarge className="tracking-wider font-thin uppercase">
          Mô tả
        </TypographyLarge>
        <DisplayContent value={product.description ?? ""} />
      </div>

      <Separator />

      <div className="space-y-4">
        <TypographyH2 className="tracking-wider uppercase inline-block">
          Sản phẩm tương tự
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
          {relateProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
