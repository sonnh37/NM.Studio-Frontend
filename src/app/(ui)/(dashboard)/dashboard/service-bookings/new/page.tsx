"use client";
import { ServiceBookingForm } from "@/components/sites/dashboard/sites/service-bookings/create-update-form";

export default function Page() {
  return (
    <div className="space-y-6">
      <ServiceBookingForm initialData={null} />
    </div>
  );
}
