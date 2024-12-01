"use client";
import { AlbumHome } from "@/components/client/sections/home/album";
import Features from "@/components/client/sections/home/feature";
import { Hero } from "@/components/client/sections/home/hero";
import ProductHome from "@/components/client/sections/home/product";

export default function HomePage() {
  // Home page
  return (
    <main
      className="relative flex justify-center items-center flex-col overflow-hidden
   "
    >
      <div className="w-full">
        <Hero />
        <div id="first-section">
          <Features />
        </div>
        <AlbumHome />
        <ProductHome />
      </div>
    </main>
  );
}
