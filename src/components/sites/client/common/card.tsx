"use client";

import {cn} from "@/lib/utils";

// Định nghĩa kiểu cho props của CardComponent
interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    hoverImageUrl: string;
}

export function Card({title, description, imageUrl, hoverImageUrl}: CardProps) {
    return (
        <div className="max-w-xl  w-full">
            <div
                className={cn(
                    "group w-full cursor-pointer overflow-hidden relative card h-[30rem] rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                    "transition-all duration-500"
                )}
                style={{backgroundImage: `url('${imageUrl}')`, backgroundSize: 'cover'}}
            >
                {/* Pseudo-element for hover effect */}
                <div
                    className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    style={{backgroundImage: `url('${hoverImageUrl}')`, backgroundSize: 'cover'}}
                />
                <div className="relative z-50 p-4">
                    <h1 className="font-bold text-xl md:text-3xl text-gray-50">{title}</h1>
                    <p className="font-normal text-base text-gray-50 my-4">{description}</p>
                </div>
            </div>
        </div>
    );
}
