"use client";

import SidebarProductCards from "@/components/client/sections/products";
import { TitleProvider } from "@/components/common/title-component";

import React from "react";

export default function Page() {
  return (
    <TitleProvider title="Sản phẩm" className="text-center">
      <SidebarProductCards />
    </TitleProvider>
  );
}
