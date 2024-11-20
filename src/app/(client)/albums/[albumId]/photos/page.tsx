"use client"
import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("@/components/client/sections/albums/gallery"), {
    ssr: true,
  });
export default function Page() {
    return (
        <Gallery/>
    );
}
