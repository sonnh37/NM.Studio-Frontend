"use client";

import DataTableServices from "@/components/dashboard/sections/services";
import {Const} from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: `${Const.DASHBOARD_SERVICE_URL}`}
];

export default function Page() {
    return (
        <div className="space-y-6">
            <DataTableServices/>
        </div>
    );
}


