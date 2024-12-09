"use client";
import { AlbumHome } from "@/components/client/sections/home/album";
import Introduce from "@/components/client/sections/home/introduce";
import { Hero } from "@/components/client/sections/home/hero";
import ProductHome from "@/components/client/sections/home/product";
import { Feature } from "@/components/client/sections/home/feature";
import { Service } from "@/components/client/sections/home/service";

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
        <Feature/>
        <AlbumHome />
        <Service/>
        <ProductHome />
      </div>
    </main>
  );
}
