"use client";

import { ProductCardsHome } from "@/components/client/sections/products/product-cards-home";
import { Const } from "@/lib/const";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is About page description",
// };

const ProductHome = () => {
  const router = useRouter();

  return (
    <div className="py-20 bg-neutral-100">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="container mx-auto w-full relative overflow-hidden">
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
            }}
            className="div"
          >
            <p className="text-4xl text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
              Product
            </p>
            <p className="text-start sp text-base md:text-md font-[100] text-neutral-700 dark:text-neutral-200 mt-2">
             
            </p>
          </motion.div>

          <ProductCardsHome />
          <div className="flex pt-5 justify-center">
            <button
              onClick={() => router.push(Const.PRODUCT)}
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            >
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHome;
