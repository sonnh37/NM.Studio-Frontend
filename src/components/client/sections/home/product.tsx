"use client"

import { Metadata } from "next";
import { ProductGallery } from "@/components/client/sections/products/product-gallery";
import { useRouter } from "next/navigation";
import { Const } from "@/lib/const";

// export const metadata: Metadata = {
//   title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is About page description",
// };

const ProductHome = () => {
  const router = useRouter();

  return (
    <div className="w-full h-auto py-10">
      <div className="flex flex-row items-center justify-center relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
          <div
            className="div"
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 1s, transform 1s",
            }}
          >
            <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Trang phục
            </h2>
            <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              Trang trọng - Lịch lãm - Quý phái
            </p>
          </div>
        </div>
      </div>
      <ProductGallery />
      <div className="flex pt-5 justify-center">
        <button
          onClick={() => router.push(Const.PRODUCT)}
          className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default ProductHome;
