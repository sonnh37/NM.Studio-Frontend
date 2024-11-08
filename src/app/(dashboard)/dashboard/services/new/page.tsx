"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {ServiceForm} from "@/components/dashboard/sections/services/create-update-form";
import { Const } from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: `${Const.DASHBOARD_SERVICE_URL}`},
    {title: 'New', link: `${Const.DASHBOARD_SERVICE_NEW_URL}`}
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


