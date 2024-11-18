"use client";

import {ServiceForm} from "@/components/dashboard/sections/services/create-update-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <ServiceForm initialData={null}/>
        </div>
    );
}


