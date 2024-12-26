"use client";
import InformationChat from "@/components/client/common/information-chat";
import Footer from "@/components/client/layouts/footer";
import BreadcrumbClient from "@/components/client/layouts/navbar/breadcrumb";
import LoadingPage from "@/components/common/loading-page";
import dynamic from "next/dynamic";
import React, {Suspense} from "react";

// Dynamic import với ssr: false để tránh hydration mismatch
const SiteHeader = dynamic(
    () => import("@/components/client/layouts/navbar/site-header"),
    {ssr: false}
);

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SiteHeader user={null}/>
            <BreadcrumbClient/>
            <Suspense fallback={<LoadingPage/>}>{children}</Suspense>
            <Footer/>
            <InformationChat/>
        </>
    );
}
