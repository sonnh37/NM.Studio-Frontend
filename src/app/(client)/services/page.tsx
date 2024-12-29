"use client";

import { ServiceList } from "@/components/client/sections/services/service-list";
import { TitleProvider } from "@/components/common/title-component";

export default function Page() {
  return (
    <TitleProvider title="Dịch vụ" className="text-center">
      <ServiceList />
    </TitleProvider>
  );
}
