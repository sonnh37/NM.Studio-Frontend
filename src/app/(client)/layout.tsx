"use client";
import InformationChat from "@/components/client/common/information-chat";
import Footer from "@/components/client/layouts/footer";
import Map from "@/components/client/layouts/map";
import BreadcrumbClient from "@/components/client/layouts/navbar/breadcrumb";
import Contact from "@/components/client/sections/home/contact";
import PageLoading from "@/components/common/page-loading";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

// Dynamic import với ssr: false để tránh hydration mismatch
const SiteHeader = dynamic(
  () => import("@/components/client/layouts/navbar/site-header"),
  { ssr: false }
);

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader user={null} />
      <BreadcrumbClient />
      <Suspense fallback={<PageLoading />}>{children}</Suspense>
      <Footer />
      <InformationChat />
    </>
  );
}
