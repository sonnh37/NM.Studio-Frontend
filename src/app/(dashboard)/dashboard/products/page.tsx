"use client";

import {Breadcrumbs} from "@/components/client/common/breadcrumb";
import DataTableProducts from "@/components/dashboard/sections/products";
import {Const} from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: Const.DASHBOARD_URL},
    {title: 'Product', link: Const.DASHBOARD_PRODUCT_URL}
];

export default function Page() {
    return (
        <div className="space-y-6">
            <DataTableProducts/>
        </div>
    );
}


