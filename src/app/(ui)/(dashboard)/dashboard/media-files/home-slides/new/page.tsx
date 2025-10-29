"use client";

import { HomeSlideForm } from "@/components/sites/dashboard/sites/media-files/home-slides/create-update-form";

export default function Page() {
  return (
    <div className="space-y-6">
      <HomeSlideForm initialData={null} />
    </div>
  );
}
