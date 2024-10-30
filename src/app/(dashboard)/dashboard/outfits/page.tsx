"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import DataTableOutfits from "@/components/dashboard/tables/outfits";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Outfit', link: '/dashboard/outfit'}
];

export default function Page() {
    return (
        <ContentLayout title="Outfit">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <DataTableOutfits/>
            </div>
        </ContentLayout>
    );
}


