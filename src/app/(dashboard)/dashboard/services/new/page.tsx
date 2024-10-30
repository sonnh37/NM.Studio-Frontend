"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {ServiceForm} from "@/components/dashboard/tables/services/create-update-form";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: '/dashboard/service'},
    {title: 'New', link: '/dashboard/service/new'}
];

export default function Page() {
    return (
        <ContentLayout title="Photo">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <ServiceForm initialData={null}/>
            </div>
        </ContentLayout>
    );
}


