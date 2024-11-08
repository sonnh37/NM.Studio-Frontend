"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import DataTableServices from "@/components/dashboard/sections/services";
import {ContentLayout} from "@/components/dashboard/content-layout";
import { Const } from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: `${Const.DASHBOARD_SERVICE_URL}`}
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


