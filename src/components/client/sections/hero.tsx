"use client";
import {motion} from "framer-motion";
import {ImagesSlider} from "@/components/ui/images-slider";
import {AnimatedTooltip} from "@/components/ui/animated-tooltip";
import {BookingModal} from "@/components/client/animated-modal";

export function Hero() {
    const images = [
        "/background-hero_1.jpg",
        "/background-hero_2.jpg",
        "/background-hero_3.jpg",
        "/background-hero_4.jpg",
        "/background-hero_5.jpg",
    ];

    const people = [
        {
            id: 1,
            name: "Nhung CEO",
            designation: "Chủ tịm",
            image:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
            id: 2,
            name: "Thy eo vì",
            designation: "Nhân viên",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            name: "Bé iu",
            designation: "Nhân viên",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 4,
            name: "Duyên xi ba",
            designation: "Nhân viên",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 5,
            name: "Hân",
            designation: "Nhân viên",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        },
        {
            id: 6,
            name: "My",
            designation: "Nhân viên",
            image:
                "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
        },
    ];

    return (
        <div className="pb-10">
            <ImagesSlider className="h-[40rem]" images={images}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -80,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="z-50 flex flex-col justify-center items-center"
                >
                    <div className="flex flex-row items-center justify-center w-full">
                        <AnimatedTooltip items={people}/>
                    </div>

                    <BookingModal/>
                </motion.div>
            </ImagesSlider>
        </div>
    );
}
