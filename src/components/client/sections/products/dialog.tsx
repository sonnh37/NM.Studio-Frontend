"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Product } from "@/types/product";
import { colorService } from "@/services/color-service";
import { sizeService } from "@/services/size-service";
import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

async function mapProductToProductDetail(
  product: Product
): Promise<ProductDetail> {
  const colors = await colorService.fetchAll(); // Giả sử fetchAll() trả về một Promise
  const sizes = await sizeService.fetchAll(); // Giả sử bạn có một hàm để fetch sizes
  const srcList: string[] =
  product.productXPhotos.length > 0
    ? product.productXPhotos
        .map(m => m.photo?.src) // Map từng item thành `src` hoặc `undefined`
        .filter(src => src !== undefined) // Lọc bỏ các giá trị `undefined`
    : ["/image-notfound.jpg"];
  return {
    name: product.name ?? "N/A",
    price: product.price?.toString() ?? "Liên hệ",
    rating: 5,
    reviewCount: 9999,
    src: srcList,
    colors: mapColorToColorDetail(colors.data?.results ?? []),
    sizes: mapSizeToSizeDetail(sizes.data?.results ?? []),
  };
}

function mapColorToColorDetail(colors: Color[]): ColorDetail[] {
  if (colors.length == 0) {
    return [];
  }
  return colors.map(
    (color) =>
      ({
        name: color.name,
        class: `${color.name}`,
        selectedClass: "ring-gray-700",
      } as ColorDetail)
  );
}

function mapSizeToSizeDetail(sizes: Size[]): SizeDetail[] {
  if (sizes.length == 0) {
    return [];
  }
  return sizes.map(
    (size) =>
      ({
        name: size.name,
        inStock: true,
      } as SizeDetail)
  );
}

interface ProductDetail {
  name: string;
  price: string;
  rating: number;
  reviewCount: number;
  src: string[];
  colors: ColorDetail[];
  sizes: SizeDetail[];
}

interface ColorDetail {
  name: string;
  class: string;
  selectedClass: string;
}

interface SizeDetail {
  name: string;
  inStock: boolean;
}

interface ExampleProps {
  product: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Example({ product, open, setOpen }: ExampleProps) {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<ColorDetail | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeDetail | null>(null);

  useEffect(() => {
    if (!product) {
      return;
    }

    async function fetchProductDetail() {
      const product_ = await mapProductToProductDetail(product);
      setProductDetail(product_);
      setSelectedColor(product_.colors[0]);
      setSelectedSize(product_.sizes[0]);
    }

    fetchProductDetail();
  }, [product]);

  if (!productDetail) {
    return <div>Loading...</div>;
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
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {productDetail.src.map((pic, index) => (
                        <CarouselItem key={index}>
                            <Card>
                              <CardContent className="flex aspect-square p-0 items-center justify-center">
                                <Image
                                  className="aspect-[2/3]  w-full"
                                  width={500}
                                  height={500}
                                  alt={productDetail.name}
                                  src={pic}
                                />
                              </CardContent>
                            </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-2/2 -translate-y-1/2 p-2 bg-neutral-100 rounded-lg shadow-lg z-10" />
                    <CarouselNext className="absolute right-2 top-2/2 -translate-y-1/2 p-2 bg-neutral-100 rounded-lg shadow-lg z-10" />
                  </Carousel>
                </div>
                {/* <img
                  alt={productDetail.imageAlt}
                  src={productDetail.imageSrc}
                /> */}
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {productDetail.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      productDetail information
                    </h3>

                    <p className="text-2xl text-gray-900">
                      {productDetail.price}
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
                                productDetail.rating > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "size-5 shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {productDetail.rating} out of 5 stars
                        </p>
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {productDetail.reviewCount} reviews
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

                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-4 flex items-center space-x-3"
                        >
                          {productDetail.colors.map((color) => (
                            <Radio
                              key={color.name}
                              value={color}
                              aria-label={color.name}
                              className={cn(
                                color.selectedClass,
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "size-8 rounded-full border border-black/10"
                                )}
                                style={{ backgroundColor: color.class }}
                              />
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset>

                      {/* Sizes */}
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

                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4 grid grid-cols-4 gap-4"
                        >
                          {productDetail.sizes.map((size) => (
                            <Radio
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={cn(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1"
                              )}
                            >
                              <span>{size.name}</span>
                              {size.inStock ? (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    stroke="currentColor"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 size-full stroke-2 text-gray-200"
                                  >
                                    <line
                                      x1={0}
                                      x2={100}
                                      y1={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </Radio>
                          ))}
                        </RadioGroup>
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
}
