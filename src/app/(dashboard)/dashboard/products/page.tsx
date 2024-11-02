"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import DataTableProducts from "@/components/dashboard/sections/courses";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Product', link: '/dashboard/product'}
];

export default function Page() {
    return (
        <ContentLayout title="Product">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <DataTableProducts/>
            </div>
        </ContentLayout>
    );
}


