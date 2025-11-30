"use client";

import ServiceTable from "@/components/sites/dashboard/sites/services";
import { Constants } from "@/lib/constants/constants";

export default function Page() {
  return (
    <div className="space-y-6">
      <ServiceTable />
    </div>
  );
}
