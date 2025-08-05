import lungtaLogo from "../../../../../public/logos/lungta-logo.jpg";
import {motion} from "framer-motion";
import Image from "next/image";
import React from "react";

const CompanyLogoData: Array<{ src: any; alt: string }> = [
    {src: lungtaLogo, alt: "Lungta Logo"},
    {src: lungtaLogo, alt: "Quantum Logo"},
    {src: lungtaLogo, alt: "Echo Logo"},
    {src: lungtaLogo, alt: "Celestial Logo"},
    {src: lungtaLogo, alt: "Pulse Logo"},
    {src: lungtaLogo, alt: "Apex Logo"},
];

const InfiniteScrollingLogosAnimation = () => {
    return (
        <div className="w-full py-20 mx-auto bg-neutral-100">
            <h2 className="text-center tracking-wide uppercase text-2xl text-neutral-700 my-2">
                <span className="border-b">Như My đồng hành cùng với các thương hiệu</span>
            </h2>
            <p className="text-center pb-6 tracking-widest text-sm uppercase font-[100] text-neutral-600 dark:text-neutral-200"></p>
            <div
                className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-transparent before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-transparent after:to-transparent after:content-['']">
                <motion.div
                    transition={{
                        duration: 10,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    initial={{translateX: 0}}
                    animate={{translateX: "-50%"}}
                    className="flex flex-none gap-16 pr-16"
                >
                    {[...new Array(2)].fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {CompanyLogoData.map(({src, alt}) => (
                                <Image
                                    key={alt}
                                    src={src}
                                    width={9999}
                                    height={9999}
                                    alt={alt}
                                    className="h-48 w-auto flex-none"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteScrollingLogosAnimation;
