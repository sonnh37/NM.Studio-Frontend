"use client";

import ErrorSystem from "@/components/common/errors/error-system";
import { LoadingPageComponent } from "@/components/common/loading-page";

import { productService } from "@/services/product-service";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is About page description",
// };

const ProductHome = () => {
  const router = useRouter();

  const {
    data: productRepresentatives = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchRepresentativeByCategory"],
    queryFn: async () => {
      const res = await productService.fetchRepresentativeByCategory();

      return res.data?.results;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  return (
    <section className="container mx-auto bg-white">
      <div className="py-4 sm:py-4 lg:py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="div"
        >
          <h2 className="text-center tracking-wide uppercase text-2xl text-neutral-700 my-2">
            <span className="border-b">Váy cưới</span>
          </h2>
          <p className="text-center pb-6 tracking-widest text-xs uppercase font-[100] text-neutral-600 dark:text-neutral-200">
            THÀNH LẬP VÀO NĂM 2017, Như My ĐÃ PHỤC VỤ HƠN 30.000 CẶP ĐÔI VÀ TRỞ
            THÀNH THƯƠNG HIỆU HÀNG ĐẦU VỀ CHỤP ẢNH CƯỚI TPHCM VÀ CÁC TỈNH LÂN
            CẬN VỚI 10 CHI NHÁNH. TONY WEDDING LUÔN TỰ HÀO MANG ĐẾN CHO BẠN SỰ
            TIN TƯỞNG BẰNG TRẢI NGHIỆM DỊCH VỤ CƯỚI TỐT NHẤT VỚI CHI PHÍ ĐÁM
            CƯỚI VỪA PHẢI.
          </p>
        </motion.div>
        <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
            <a
              href={`/products?categoryName=${productRepresentatives[0]?.category?.name}`}
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <Image
                width={9999}
                height={9999}
                src={
                  productRepresentatives[0]?.product?.src ||
                  "/image-notfound.jpg"
                }
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                {productRepresentatives[0]?.category?.name || "N/A"}
              </h3>
            </a>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
            <a
              href={`/products?categoryName=${productRepresentatives[1]?.category?.name}`}
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
            >
              <Image
                width={9999}
                height={9999}
                src={
                  productRepresentatives[1]?.product?.src ||
                  "/image-notfound.jpg"
                }
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                {productRepresentatives[1]?.category?.name || "N/A"}
              </h3>
            </a>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
              <a
                href={`/products?categoryName=${productRepresentatives[2]?.category?.name}`}
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <Image
                  width={9999}
                  height={9999}
                  src={
                    productRepresentatives[2]?.product?.src ||
                    "/image-notfound.jpg"
                  }
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  {productRepresentatives[2]?.category?.name || "N/A"}
                </h3>
              </a>
              <a
                href={`/products?categoryName=${productRepresentatives[3]?.category?.name}`}
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <Image
                  width={9999}
                  height={9999}
                  src={
                    productRepresentatives[3]?.product?.src ||
                    "/image-notfound.jpg"
                  }
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  {productRepresentatives[3]?.category?.name || "N/A"}
                </h3>
              </a>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
            <a
              href={`/products?categoryName=${productRepresentatives[4]?.category?.name}`}
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <Image
                width={9999}
                height={9999}
                src={
                  productRepresentatives[4]?.product?.src ||
                  "/image-notfound.jpg"
                }
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                {productRepresentatives[4]?.category?.name || "N/A"}
              </h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHome;
