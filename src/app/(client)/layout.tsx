"use client"
import Footer from "@/components/client/layouts/footer";
import Map from "@/components/client/layouts/map";
import { SiteHeader } from "@/components/client/layouts/navbar/site-header";
import Contact from "@/components/client/sections/home/contact";
import React from "react";
import BreadcrumbClient from "@/components/client/layouts/navbar/breadcrumb";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="">
          <SiteHeader user={null}/>
          <BreadcrumbClient/>
          {children}
          <Map/>
          <Contact/>
          <Footer/>
      </div>
  );
}
