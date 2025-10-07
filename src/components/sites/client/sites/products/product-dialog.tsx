"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Color } from "@/types/entities/color";
import { Product } from "@/types/entities/product";
import { Size } from "@/types/entities/size";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ExampleProps {
  product: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ProductDialog = ({ product, open, setOpen }: ExampleProps) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const handleSizeChange = (sizeName: string) => {
    const size = product.productSizes?.find(
      (pxc) => pxc.size?.name === sizeName
    );
    if (size) {
      setSelectedSize(size.size ?? null);
    }
  };

  const handleColorChange = (colorName: string) => {
    const color = product.productVariants?.find(
      (pxc) => pxc.color?.name === colorName
    );
    if (color) {
      setSelectedColor(color.color ?? null);
    }
  };

  if (!product) {
    return;
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-[1001]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-[1001] w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center p-0 m-0 border-none">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white p-0 shadow-2xl">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute z-50 right-8 top-8 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start sm:grid-cols-12">
                <div className="aspect-[2/3] p-0 w-full rounded-none border-none bg-gray-100 object-cover sm:col-span-6">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.productMedias?.map((pic, index) => (
                        <CarouselItem key={index}>
                          <Card className="border-none">
                            <CardContent className="flex aspect-square p-0 m-0 border-none items-center justify-center">
                              <Image
                                className="aspect-[2/3]  w-full"
                                width={9999}
                                height={9999}
                                alt={pic.mediaBase?.title ?? ""}
                                src={pic.mediaBase?.src ?? ""}
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-100 bg-opacity-40 rounded-lg border-none shadow-lg z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-100 bg-opacity-40 rounded-lg border-none shadow-lg z-10" />
                  </Carousel>
                </div>
                {/* <img
                  alt={productDetail.imageAlt}
                  src={productDetail.imageSrc}
                /> */}
                <div className="sm:col-span-6 m-8">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      ProductDetail information
                    </h3>

                    <p className="text-2xl text-gray-900">{product.price}</p>

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
                        <div className="flex flex-row space-x-2 mt-4">
                          {product.productVariants?.map((pxc) => (
                            <div
                              key={pxc.id}
                              className="flex flex-col items-center"
                            >
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
                                onClick={() =>
                                  handleColorChange(pxc.color?.name ?? "")
                                } // Đúng hàm xử lý
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

                        <div className="flex flex-row space-x-2 mt-4">
                          {product.productSizes?.map((pxc) => (
                            <div
                              key={pxc.id}
                              className="flex flex-col items-center"
                            >
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
                                onClick={() =>
                                  handleSizeChange(pxc.size?.name ?? "")
                                }
                                disabled={!pxc.isActive}
                              >
                                {pxc.size?.name}
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
