"use client";
import { AlbumComponent } from "@/components/client/sections/album";
import { Hero } from "@/components/client/sections/hero";
import Features from "@/components/client/sections/feature";
import { OutfitComponent } from "@/components/client/sections/outfits/outfit";
import Contact from "@/components/client/sections/contact";

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
        <AlbumComponent />
        <OutfitComponent />
        <Contact />
      </div>
    </main>
  );
}
