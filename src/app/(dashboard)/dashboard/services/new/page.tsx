"use client";

import dynamic from "next/dynamic";

// Dùng dynamic để import ServiceForm một cách động
const ServiceForm = dynamic(() => import('@/components/dashboard/sections/services/create-update-form').then((mod) => mod.ServiceForm), {
    ssr: false,  // Tắt SSR nếu cần thiết
});
export default function Page() {
    return (
        <div className="space-y-6">
            <ServiceForm initialData={null}/>
        </div>
    );
}


