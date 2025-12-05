"use client";
import ServiceBookingTable from "@/components/sites/dashboard/sites/service-bookings";
import ServiceTable from "@/components/sites/dashboard/sites/services";

export default function Page() {
  return (
    <div className="space-y-6">
      <ServiceBookingTable />
    </div>
  );
}
