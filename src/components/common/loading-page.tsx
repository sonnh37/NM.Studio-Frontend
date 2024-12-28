"use client";
import { motion } from "framer-motion";

export function LoadingPage() {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5, // Thời gian mờ dần
        ease: "easeInOut", // Hiệu ứng mượt mà
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-600"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-600"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-600"></div>
        </div>
      </div>
    </motion.div>
  );
}

export function LoadingPageComponent() {
  return (
    <div className="h-screen bg-white bg-opacity-60 z-10 w-full flex items-center justify-center">
      <div className="flex items-center">
        {/* <span className="text-3xl mr-4">Loading</span> */}
        <div className="flex gap-2">
          <div className="w-2 h-2 !rounded-full animate-pulse bg-neutral-600"></div>
          <div className="w-2 h-2 !rounded-full animate-pulse bg-neutral-600"></div>
          <div className="w-2 h-2 !rounded-full animate-pulse bg-neutral-600"></div>
        </div>
      </div>
    </div>
  );
}
