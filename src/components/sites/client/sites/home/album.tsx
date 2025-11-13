// Album.tsx
"use client";

import { Const } from "@/lib/constants/const";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlbumList } from "../albums/album-list";

export function AlbumHome() {
  const router = useRouter();

  return (
    <div className="py-20 ">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="mx-auto w-full relative overflow-hidden">
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
            className="container mx-auto"
          >
            <h2 className="text-center  tracking-wide uppercase text-2xl text-neutral-700 my-2">
              <span className="border-b">Album các concept</span>
            </h2>
            <p className="text-center pb-6 tracking-widest text-xs uppercase font-thin text-neutral-600 dark:text-neutral-200">
              ĐA SỐ KHÁCH HÀNG Như My LÀ CẶP ĐÔI CÁC TRẺ CÓ PHONG CÁCH THẨM MỸ
              HIỆN ĐẠI.
            </p>
          </motion.div>

          <AlbumList />
          <div className="flex pt-5 justify-center">
            <button
              onClick={() => router.push(Const.ALBUMS)}
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
