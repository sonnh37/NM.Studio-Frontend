"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { FreeMode, Navigation, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatPrice, formatRangePrice } from "@/lib/utils/number-utils";
import { productService } from "@/services/product-service";
// import { Color } from "@/types/entities/color";
import { Product, ProductStatus } from "@/types/entities/product";
import {
  InventoryStatus,
  ProductVariant,
} from "@/types/entities/product-variant";
// import { Size } from "@/types/entities/size";
import { StarIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ExampleProps {
  productId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ProductDialog = ({ productId, open, setOpen }: ExampleProps) => {
  const [selectedColor, setSelectedColor] = useState<ProductVariant | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<ProductVariant | null>(null);
  if (!productId) return;

  const {
    data: product = {} as Product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchProductDialog", productId],
    queryFn: async () =>
      productService.getById(productId, [
        "thumbnail",
        "variants.productMedias.mediaBase",
      ]),
    select: (response) => response.data,
    refetchOnWindowFocus: false,
    enabled: !!productId,
  });

  if (isLoading) return <LoadingPageComponent />;

  const variants = product.variants;

  let slides = variants
    .flatMap((v) => v.productMedias)
    .flatMap((f) => f.mediaBase)
    .filter((m) => m != undefined);

  if (product.thumbnail) {
    slides = [product.thumbnail, ...slides];
  }
  const colors = variants.map((v) => v.color).filter((f) => f != undefined);
  const sizes = variants.map((v) => v.size).filter((f) => f != undefined);

  // Calculate min and max price from variants
  const prices = variants.map((v) => v.price || 0).filter((p) => p > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const handleSizeChange = (sizeName: string) => {
    const variant = variants.find(
      (v) => v.size === sizeName && v.status === InventoryStatus.Available
    );
    setSelectedSize(variant || null);
  };

  const handleColorChange = (colorName: string) => {
    const variant = variants.find(
      (v) => v.color === colorName && v.status === InventoryStatus.Available
    );
    setSelectedColor(variant || null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl border-none sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0! bg-white">
        {/* <DialogHeader></DialogHeader> */}
        <div className="relative flex w-full items-center overflow-hidden">
          <div className="flex w-full max-h-[90vh] overflow-hidden">
            {/* left - Full height carousel */}
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
              <Swiper
                style={
                  {
                    "--swiper-navigation-color": "#000", // Màu nút điều hướng
                    "--swiper-pagination-color": "#000", // Màu chấm phân trang
                    "--swiper-navigation-size": "20px",
                  } as React.CSSProperties
                }
                className="w-full h-full"
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {slides.map((pxp, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      className="w-full h-full object-cover"
                      width={9999}
                      height={9999}
                      alt={pxp.title ?? ""}
                      src={pxp.mediaUrl ?? ""}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* right */}
            <div className="w-1/2 overflow-y-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                {product.name}
              </h2>

              <section aria-labelledby="information-heading" className="mt-2">
                <h3 id="information-heading" className="sr-only">
                  ProductDetail information
                </h3>

                <p className="text-2xl text-gray-900">
                  {selectedColor || selectedSize
                    ? formatPrice((selectedColor || selectedSize)?.price || 0)
                    : formatRangePrice(minPrice, maxPrice)}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={cn(
                            true ? "text-gray-900" : "text-gray-200",
                            "size-5 shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className="sr-only">{`4.8`} out of 5 stars</p>
                    <a
                      href="#"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {`6834`} reviews
                    </a>
                  </div>
                </div>
              </section>

              <section aria-labelledby="options-heading" className="mt-10">
                <h3 id="options-heading" className="sr-only">
                  productDetail options
                </h3>

                <form>
                  {/* Colors */}
                  <fieldset aria-label="Choose a color">
                    <legend className="text-sm font-medium text-gray-900">
                      Color
                    </legend>
                    <div className="flex flex-row gap-2 mt-4">
                      {variants.map((pxc) => (
                        <div
                          key={pxc.id}
                          className="flex flex-col items-center"
                        >
                          <Button
                            variant="outline"
                            type="button"
                            className={`h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ease-in-out
          ${
            pxc.color && pxc.status == InventoryStatus.Available
              ? selectedColor?.color === pxc.color // Sử dụng đúng trạng thái để so sánh
                ? "border-indigo-600 ring-2 ring-indigo-500"
                : ""
              : "opacity-50 cursor-not-allowed"
          }`}
                            onClick={() => handleColorChange(pxc.color ?? "")} // Đúng hàm xử lý
                            disabled={
                              !(
                                pxc.color &&
                                pxc.status == InventoryStatus.Available
                              )
                            }
                            style={{
                              backgroundColor: pxc.color ?? "#fff",
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
                      <div className="text-sm font-medium text-gray-900">
                        Size
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                      {variants.map((pxc) => (
                        <div
                          key={pxc.id}
                          className="flex flex-col items-center"
                        >
                          <Button
                            variant="outline"
                            type="button"
                            className={`h-10 w-10 rounded-full border-2 
                ${
                  pxc.size && pxc.status == InventoryStatus.Available
                    ? selectedSize?.size === pxc.size
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } 
                flex items-center justify-center text-sm font-medium transition-all duration-200 ease-in-out`}
                            onClick={() => handleSizeChange(pxc.size ?? "")}
                            disabled={
                              !(
                                pxc.size &&
                                pxc.status == InventoryStatus.Available
                              )
                            }
                          >
                            {pxc.size}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <Button
                    type="submit"
                    variant="destructive"
                    className="grid grid-cols-1 w-full mt-4"
                  >
                    <Link href="tel:0935538855">Liên hệ</Link>
                  </Button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
