"use client";
import { AlbumHome } from "@/components/client/sections/home/album";
import Contact from "@/components/client/sections/home/contact";
import Features from "@/components/client/sections/home/feature";
import { Hero } from "@/components/client/sections/home/hero";
import ProductHome from "@/components/client/sections/home/product";
import { CardHoverEffectDemo } from "@/components/client/sections/test";

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
        <Contact />
      </div>
    </main>
  );
}
