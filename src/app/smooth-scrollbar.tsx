"use client";

import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export default function SmoothScrollBar({ children }: { children: React.ReactNode }) {
    const scrollContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainer.current) {
            const options = { damping: 0.05 }; // Điều chỉnh độ mượt
            const scrollbar = Scrollbar.init(scrollContainer.current, options);

            return () => {
                scrollbar.destroy(); // Cleanup khi unmount
            };
        }
    }, []);

    return (
        <div ref={scrollContainer}> {/* Chỉnh sửa overflow */}
            {children}
        </div>
    );
}
