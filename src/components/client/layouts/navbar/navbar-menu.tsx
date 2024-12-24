"use client";
import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
                             setActive,
                             active,
                             href = "#",
                             item,
                             children,
                         }: {
    setActive: (item: string) => void;
    active: string | null;
    href: string;
    item: string;
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            onMouseEnter={() => setActive(item)}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative  dark:hover:text-white py-2 hover:text-black hover:opacity-100 hover:inset-0 hover:transform
                hover:bg-gradient-to-b  hover:rounded-sm "
        >
            <Link href={href}>
                <motion.p transition={{duration: 0.3}} className="cursor-pointer ">
                    {item}
                </motion.p>
            </Link>
            {active !== null && (
                <motion.div
                    initial={{opacity: 0, scale: 0.85, y: 10}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    transition={transition}
                >
                    {active === item && (
                        //top-[calc(100%)]
                        <div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className="bg-white dark:bg-black backdrop-blur-sm rounded-none overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
            {/* <div
                className={` border-black dark:border-white-100 transition-all border-t-[1px] duration-500 ease-in-out ${hovered ? 'w-full' : 'w-0'}`}></div> */}
        </motion.div>
    );
};

// @ts-ignore
export const Menu = ({
                         setActive,
                         children,
                     }: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative w-full border-t border-stroke shadow-input bg-background"
        >
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between py-2 space-x-4">
                {children}
            </div>
        </nav>
    );
};

// @ts-ignore
export const ProductItem = ({
                                title,
                                description,
                                href,
                                src,
                                index,
                                hoveredIndex,
                                setHoveredIndex,
                            }: {
    title: string;
    description: string;
    href: string;
    src: string;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}) => {
    return (
        <Link
            key={index}
            href={href}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <AnimatePresence>
                {hoveredIndex === index && (
                    <motion.span
                        className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block "
                        layoutId="hoverBackground"
                        initial={{opacity: 0}}
                        animate={{
                            opacity: 1,
                            transition: {duration: 0.15},
                        }}
                        exit={{
                            opacity: 0,
                            transition: {duration: 0.15, delay: 0.2},
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="group-hover:border-slate-700 relative z-20">
                <div className="relative z-50 flex">
                    <Image
                        src={src}
                        width={140}
                        height={70}
                        alt={title}
                        className="flex-shrink-0 shadow-2xl"
                    />
                    <div className="pl-5">
                        <h4 className="text-medium font-bold mb-1 text-black dark:text-white block truncate max-w-60">
                            {title}
                        </h4>
                        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300 line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const HoveredLink = ({children, ...rest}: any) => {
    return (
        <Link
            {...rest}
            className="text-neutral-700 dark:text-neutral-200 hover:text-black "
        >
            {children}
        </Link>
    );
};
