"use client";

import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import DataTableProducts from "@/components/dashboard/sections/products";
import {Const} from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: Const.DASHBOARD_URL},
    {title: 'Product', link: Const.DASHBOARD_PRODUCT_URL}
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


