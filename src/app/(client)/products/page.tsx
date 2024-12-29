"use client";

import { SidebarProduct } from "@/components/client/sections/products/sidebar-product";
import { TitleProvider } from "@/components/common/title-component";

import React from "react";

export default function Page() {
  return (
    <TitleProvider title="Sản phẩm" className="text-center">
      <SidebarProduct />
    </TitleProvider>
  );
}
