"use client";

import {PhotoForm} from "@/components/dashboard/sites/photos/create-update-form";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "Photo", link: "/dashboard/photo"},
    {title: "New", link: "/dashboard/photo/new"},
];

export default function Page() {
    return (
        <div className="space-y-6">
            <PhotoForm initialData={null}/>
        </div>
    );
}
