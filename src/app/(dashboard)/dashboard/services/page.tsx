"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import DataTableServices from "@/components/dashboard/tables/services";
import {ContentLayout} from "@/components/dashboard/content-layout";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: '/dashboard/service'}
];

export default function Page() {
    return (
        <ContentLayout title="Service">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <DataTableServices/>
            </div>
        </ContentLayout>
    );
}


