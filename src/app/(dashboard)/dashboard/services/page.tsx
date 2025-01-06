"use client";

import DataTableServices from "@/components/dashboard/sites/services";
import {Const} from "@/lib/constants/const";

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


