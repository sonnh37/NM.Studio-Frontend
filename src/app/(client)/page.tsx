"use client";
import {AlbumHome} from "@/components/client/sections/home/album";
import Introduce from "@/components/client/sections/home/introduce";
import {Hero} from "@/components/client/sections/home/hero";
import ProductHome from "@/components/client/sections/home/product";
import {Feature} from "@/components/client/sections/home/feature";
import {Service} from "@/components/client/sections/home/service";
import {Blog} from "@/components/client/sections/home/blog";
import Contact from "@/components/client/sections/home/contact";
import {BookingModal} from "@/components/client/common/booking-modal";
import InfiniteScrollingLogosAnimation from "@/components/client/common/infinite-srolling-logos";

export default function HomePage() {
    // Home page
    return (
        <main
            className="relative flex justify-center items-center flex-col
   "
        >
            <div className="h-full w-full">
                <Hero/>
                <Introduce/>
                <Feature/>
                <AlbumHome/>
                <Service/>
                <ProductHome/>
                <InfiniteScrollingLogosAnimation/>
                <Blog/>
                <Contact/>
                <BookingModal/>
            </div>
        </main>
    );
}
