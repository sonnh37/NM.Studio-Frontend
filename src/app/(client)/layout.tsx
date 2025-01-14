"use client";
import InformationChat from "@/components/client/common/information-chat";
import Footer from "@/components/client/layouts/footer";
import BreadcrumbClient from "@/components/client/common/breadcrumb";
import { LoadingPageComponent } from "@/components/_common/loading-page";

import { UserAccessControl } from "@/components/_common/user-access-control";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import "./styles.scss";

const SiteHeader = dynamic(
  () =>
    import("@/components/client/layouts/navbar/site-header").then(
      (mod) => mod.SiteHeader
    ),
  { ssr: false }
);
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
