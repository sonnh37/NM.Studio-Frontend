"use client";

import { ServiceList } from "@/components/sites/client/sites/services/service-list";
import { TitleProvider } from "@/components/_common/title-component";

export default function Page() {
  return (
    <TitleProvider title="Dịch vụ" className="text-center">
      <ServiceList />
    </TitleProvider>
  );
}
