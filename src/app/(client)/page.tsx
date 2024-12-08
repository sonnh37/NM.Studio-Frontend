"use client";
import { AlbumHome } from "@/components/client/sections/home/album";
import Introduce from "@/components/client/sections/home/introduce";
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
        <Introduce />
        <AlbumHome />
        <ProductHome />
      </div>
    </main>
  );
}
