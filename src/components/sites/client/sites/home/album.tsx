// Album.tsx
"use client";

import { Constants } from "@/lib/constants/constants";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlbumList } from "../albums/album-list";

export function AlbumHome() {
  const router = useRouter();

  return (
    <div className="py-20 h-full sm:min-h-screen">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="mx-auto w-full relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto text-center max-w-4xl pb-8"
          >
            {/* Decorative elements */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-px w-8 bg-gray-300"></div>
              <div className="h-px w-12 bg-gray-400"></div>
              <div className="h-px w-8 bg-gray-300"></div>
            </div>

            {/* Main title */}
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-12 mt-6">
              Album Concept
              <br />
              <span className="italic text-gray-700">Đa Dạng</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide max-w-2xl mx-auto">
              Khám phá bộ sưu tập concept độc đáo, được thiết kế riêng cho các
              cặp đôi hiện đại với phong cách thẩm mỹ tinh tế
            </p>
          </motion.div>

          <AlbumList />
          <div className="flex pt-5 justify-center">
            <button
              onClick={() => router.push(Constants.ALBUMS)}
              className="border-2 border-neutral-300 text-neutral-500 px-12 py-4 rounded-none tracking-widest uppercase bg-transparent hover:bg-neutral-500 hover:text-white dark:text-neutral-200 transition duration-200"
            >
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
