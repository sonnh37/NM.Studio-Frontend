"use client";

import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { Constants } from "@/lib/constants/constants";
import { processResponse } from "@/lib/utils";
import { productService } from "@/services/product-service";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";

const ProductHome = () => {
  const {
    data: productRepresentatives = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchRepresentativeByCategory"],
    queryFn: () => productService.getRepresentativeByCategory(),
    select: (res) => processResponse(res),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  const ProductCard = ({ product, index, size = "medium" }: any) => {
    if (!product) return null;

    const sizes = {
      large: "col-span-1 md:col-span-2",
      medium: "col-span-1",
      small: "col-span-1",
    };

    const heights = {
      large: "aspect-[3/4] md:aspect-[4/5]",
      medium: "aspect-[3/4]",
      small: "aspect-[2/3]",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative ${sizes[size]}`}
      >
        <a
          href={`/products?categoryName=${product?.category?.name}`}
          className="block relative overflow-hidden group h-full"
        >
          {/* Image Container */}
          <div className={`relative ${heights[size]} bg-gray-100`}>
            <Image
              src={product?.product?.src ?? Constants.IMAGE_DEFAULT_URL}
              alt={product?.category?.name ?? "Product"}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />

            {/* Category Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
              <h3 className="text-lg md:text-xl font-light tracking-wider text-white">
                {product?.category?.name}
              </h3>
            </div>

            {/* Simple Arrow Indicator on Hover */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
          </div>
        </a>
      </motion.div>
    );
  };

  // Get layout based on product count - UPDATED FOR MOBILE
  const getGridLayout = () => {
    const count = productRepresentatives.length;

    if (count === 1) {
      return (
        <div className="grid grid-cols-1 gap-4 md:gap-8">
          <ProductCard
            product={productRepresentatives[0]}
            index={0}
            size="large"
          />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {productRepresentatives.map((product: any, index: number) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              size="medium"
            />
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {productRepresentatives.map((product: any, index: number) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              size="medium"
            />
          ))}
        </div>
      );
    }

    if (count === 4) {
      return (
        <>
          {/* First two products on mobile, full width */}
          <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
            {productRepresentatives
              .slice(0, 2)
              .map((product: any, index: number) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  size="large"
                />
              ))}
          </div>

          {/* Last two products on mobile, 2 columns */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-2 mt-4 md:mt-0">
            {productRepresentatives
              .slice(2, 4)
              .map((product: any, index: number) => (
                <ProductCard
                  key={index + 2}
                  product={product}
                  index={index + 2}
                  size="small"
                />
              ))}
          </div>
        </>
      );
    }

    // For 5+ products
    if (count >= 5) {
      return (
        <>
          {/* First product on mobile, full width */}
          <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3">
            <ProductCard
              product={productRepresentatives[0]}
              index={0}
              size="large"
            />

            {/* Next 4 products on mobile, 2 columns */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 md:col-span-2 mt-4 md:mt-0">
              {productRepresentatives
                .slice(1, 3)
                .map((product: any, index: number) => (
                  <ProductCard
                    key={index + 1}
                    product={product}
                    index={index + 1}
                    size="medium"
                  />
                ))}
              {productRepresentatives
                .slice(3, 5)
                .map((product: any, index: number) => (
                  <ProductCard
                    key={index + 3}
                    product={product}
                    index={index + 3}
                    size="small"
                  />
                ))}
            </div>
          </div>
        </>
      );
    }

    // Default fallback - all products in single column on mobile
    return (
      <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3">
        {productRepresentatives.map((product: any, index: number) => (
          <ProductCard
            key={index}
            product={product}
            index={index}
            size="medium"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-24 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
            <div className="h-px w-8 md:w-12 bg-gray-300" />
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
            <div className="h-px w-8 md:w-12 bg-gray-300" />
          </div>

          <h1 className="text-3xl md:text-6xl font-light tracking-tight text-gray-900 mb-6 md:mb-8">
            Váy Cưới
            <br />
            <span className="italic">Tinh Tế</span>
          </h1>

          <p className="text-xs md:text-base text-gray-600 tracking-wider md:tracking-widest leading-relaxed font-light px-2 md:px-0">
            THÀNH LẬP VÀO NĂM 2017, Như My ĐÃ PHỤC VỤ HƠN 30.000 CẶP ĐÔI VÀ TRỞ
            THÀNH THƯƠNG HIỆU HÀNG ĐẦU VỀ CHỤP ẢNH CƯỚI TPHCM VÀ CÁC TỈNH LÂN
            CẬN VỚI 10 CHI NHÁNH. TONY WEDDING LUÔN TỰ HÀO MANG ĐẾN CHO BẠN SỰ
            TIN TƯỞNG BẰNG TRẢI NGHIỆM DỊCH VỤ CƯỚI TỐT NHẤT VỚI CHI PHÍ ĐÁM
            CƯỚI VỪA PHẢI.
          </p>

          {/* Stats - Minimal */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-1 md:mb-2">
                  30K+
                </div>
                <div className="text-[10px] md:text-xs tracking-widest text-gray-500">
                  CẶP ĐÔI
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-1 md:mb-2">
                  10+
                </div>
                <div className="text-[10px] md:text-xs tracking-widest text-gray-500">
                  CHI NHÁNH
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-1 md:mb-2">
                  7+
                </div>
                <div className="text-[10px] md:text-xs tracking-widest text-gray-500">
                  NĂM KINH NGHIỆM
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 md:mb-24"
        >
          {getGridLayout()}
        </motion.div>

        {/* CTA Section */}
        {productRepresentatives.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="max-w-md mx-auto">
              <h3 className="text-lg md:text-xl font-light tracking-wider text-gray-900 mb-4 md:mb-6">
                KHÁM PHÁ BỘ SƯU TẬP ĐẦY ĐỦ
              </h3>
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-900 py-4 md:py-6 text-xs md:text-sm tracking-widest rounded-none font-light"
              >
                <a href="/products">
                  XEM TẤT CẢ SẢN PHẨM
                  <ChevronRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default ProductHome;
