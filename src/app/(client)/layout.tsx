"use client";
import Footer from "@/components/client/layouts/footer";
import Map from '@/components/client/layouts/map';
import { NavbarHeader } from "@/components/client/layouts/navbar";
import Contact from '@/components/client/sections/home/contact';
import React from 'react';

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavbarHeader/>
            <div>
                {children}
            </div>
            <Map/>
            <Contact />
            <Footer/>
        </div>
    );
}
