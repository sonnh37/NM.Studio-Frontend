"use client"

import { Metadata } from "next";
import { ProductGallery } from "@/components/client/sections/products/product-gallery";
import { useRouter } from "next/navigation";
import { Const } from "@/lib/const";
import MapEmbed from "../common/map-embed";

// export const metadata: Metadata = {
//   title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is About page description",
// };

const Map = () => {
  const router = useRouter();

  return (
    <div className="w-full h-auto pt-20">
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
            <h2 className="text-4xl text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-500">
              NHUMY STUDIO MAPS
            </h2>
            <p className="text-center text-base md:text-lg font-normal text-neutral-500 dark:text-neutral-200 w-full mt-2 mx-auto pb-5">
             1806/66 ĐƯỜNG HUỲNH TẤN PHÁT, XÃ PHÚ XUÂN, NHÀ BÈ, TP.HCM
            </p>
          </div>
        </div>
      </div>
      <MapEmbed />
    </div>
  );
};

export default Map;
