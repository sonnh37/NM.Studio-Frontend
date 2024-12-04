"use client";
import InformationChat from "@/components/client/common/information-chat";
import Footer from "@/components/client/layouts/footer";
import Map from "@/components/client/layouts/map";
import BreadcrumbClient from "@/components/client/layouts/navbar/breadcrumb";
import SiteHeader from "@/components/client/layouts/navbar/site-header";
import Contact from "@/components/client/sections/home/contact";
import PageLoading from "@/components/common/page-loading";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isOpen = useSelector((state: RootState) => state.chat.isOpen);

  return (
    <>
      <SiteHeader user={null} />
      <BreadcrumbClient />
      <Suspense fallback={<PageLoading />}>{children}</Suspense>
      <Contact />
      <Footer />

      <InformationChat />
    </>
  );
}
