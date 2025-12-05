"use client";
import { AlbumHome } from "@/components/sites/client/sites/home/album";
import Introduce from "@/components/sites/client/sites/home/introduce";
import { Hero } from "@/components/sites/client/sites/home/hero";
import ProductHome from "@/components/sites/client/sites/home/product";
import { Feature } from "@/components/sites/client/sites/home/feature";
import { Service } from "@/components/sites/client/sites/home/service";
import { Blog } from "@/components/sites/client/sites/home/blog";
import Contact from "@/components/sites/client/sites/home/contact";
import { BookingModal } from "@/components/sites/client/common/booking-modal";
import InfiniteScrollingLogosAnimation from "@/components/sites/client/common/infinite-srolling-logos";
export default function HomePage() {
  // Home page
  return (
    <main
      className="relative flex justify-center items-center flex-col
   "
    >
      <div className="h-full w-full">
        <Hero />
        <Introduce />
        <Feature />
        <AlbumHome />
        <Service />
        <ProductHome />
        <Blog />
        <InfiniteScrollingLogosAnimation />
        <Contact />
        <div id="contact-section">
          <BookingModal />
        </div>
      </div>
    </main>
  );
}
