"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import DataTablePhotos from "@/components/dashboard/tables/photos";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "Photo", link: "/dashboard/photo"},
];

export default function Page() {
    return (
        <ContentLayout title="Photo">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <DataTablePhotos/>
            </div>
        </ContentLayout>
    );
}
