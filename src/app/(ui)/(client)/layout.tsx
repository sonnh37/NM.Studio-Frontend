"use client";
import InformationChat from "@/components/sites/client/common/information-chat";
import Footer from "@/components/sites/client/layouts/footer";
import BreadcrumbClient from "@/components/sites/client/common/breadcrumb";
import { LoadingPageComponent } from "@/components/_common/loading-page";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import "./styles.scss";
import { SiteHeader } from "@/components/sites/client/layouts/navbar/site-header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <BreadcrumbClient />
      <Suspense fallback={<LoadingPageComponent />}>{children}</Suspense>
      <Footer />
      <InformationChat />
    </>
  );
}
