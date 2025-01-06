"use client";

import { SidebarProduct } from "@/components/client/sites/products/sidebar-product";
import { TitleProvider } from "@/components/_common/title-component";

import React from "react";

export default function Page() {
  return (
    <TitleProvider title="Sản phẩm" className="text-center">
      <SidebarProduct />
    </TitleProvider>
  );
}
