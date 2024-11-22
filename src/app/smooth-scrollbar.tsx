"use client";

import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export default function SmoothScrollBar({ children }: { children: React.ReactNode }) {
    const scrollContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = { damping: 0.05 }; // Điều chỉnh độ mượt (0.01 - 1)
        const scrollbar = Scrollbar.init(scrollContainer.current!, options);

        return () => {
            scrollbar.destroy(); // Cleanup khi unmount
        };
    }, []);

    return (
        <div ref={scrollContainer} style={{ height: "100vh", overflow: "hidden" }}>
            {children}
        </div>
    );
}
