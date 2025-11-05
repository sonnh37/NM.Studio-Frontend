"use client";

import ServiceTable from "@/components/sites/dashboard/sites/services";
import { Const } from "@/lib/constants/const";

export default function Page() {
  return (
    <div className="space-y-6">
      <ServiceTable />
    </div>
  );
}
