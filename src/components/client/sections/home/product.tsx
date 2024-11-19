"use client"

import {ProductCards} from "@/components/client/sections/products/product-cards";
import {useRouter} from "next/navigation";
import {Const} from "@/lib/const";

// export const metadata: Metadata = {
//   title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is About page description",
// };

const ProductHome = () => {
    const router = useRouter();

    return (
        <div className="w-full bg-neutral-100  h-auto py-20">
            <div className="flex flex-row items-center justify-center relative w-full">
                <div className="container mx-auto w-full relative overflow-hidden px-4">
                    <div
                        className="div"
                        style={{
                            opacity: 1,
                            transform: "translateY(0px)",
                            transition: "opacity 1s, transform 1s",
                        }}
                    >
                        <h2 className="text-4xl text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-0">
                            Product
                        </h2>
                        <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">

                        </p>
                    </div>
                </div>
            </div>
            <ProductCards/>
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
