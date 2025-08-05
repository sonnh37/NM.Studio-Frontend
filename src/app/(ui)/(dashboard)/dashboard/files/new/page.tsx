"use client";

import {PhotoForm} from "@/components/sites/dashboard/sites/media-files/create-update-form";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "MediaFile", link: "/dashboard/mediaFile"},
    {title: "New", link: "/dashboard/mediaFile/new"},
];

export default function Page() {
    return (
        <div className="space-y-6">
            <PhotoForm initialData={null}/>
        </div>
    );
}
