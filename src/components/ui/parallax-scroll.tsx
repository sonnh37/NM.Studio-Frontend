"use client";
import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";

export const ParallaxScroll = ({
                                   images,
                                   className,
                               }: {
    images: string[];
    className?: string;
}) => {
    const gridRef = useRef<any>(null);
    const {scrollYProgress} = useScroll({
        container: gridRef, // remove this if your container is not fixed height
        offset: ["start start", "end start"], // remove this if your container is not fixed height
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const third = Math.ceil(images.length / 3);

    const firstPart = images.slice(0, third);
    const secondPart = images.slice(third, 2 * third);
    const thirdPart = images.slice(2 * third);

    return (
        <div
            className={cn("h-160 items-start overflow-y-auto w-full", className)}
            ref={gridRef}
        >
            <div className="relative z-20 py-10 max-w-7xl mx-auto">
                <div className="px-8">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                        Album
                    </h4>

                    <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                        ĐA SỐ KHÁCH HÀNG NMS LÀ CẶP ĐÔI CÁC TRẺ CÓ PHONG CÁCH THẨM MỸ HIỆN ĐẠI.
                    </p>
                </div>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-5 py-20"
                ref={gridRef}
            >
                <div className="grid gap-10">
                    {firstPart.map((el, idx) => (
                        <motion.div
                            style={{y: translateFirst}} // Apply the translateY motion value here
                            key={"grid-1" + idx}
                        >
                            <Image
                                src={el}
                                className="h-80 w-full object-cover object-top-left rounded-lg gap-10 m-0! p-0!"
                                height="400"
                                width="400"
                                alt="thumbnail"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-10">
                    {secondPart.map((el, idx) => (
                        <motion.div style={{y: translateSecond}} key={"grid-2" + idx}>
                            <Image
                                src={el}
                                className="h-80 w-full object-cover object-top-left rounded-lg gap-10 m-0! p-0!"
                                height="400"
                                width="400"
                                alt="thumbnail"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-10">
                    {thirdPart.map((el, idx) => (
                        <motion.div style={{y: translateThird}} key={"grid-3" + idx}>
                            <Image
                                src={el}
                                className="h-80 w-full object-cover object-top-left rounded-lg gap-10 m-0! p-0!"
                                height="400"
                                width="400"
                                alt="thumbnail"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
