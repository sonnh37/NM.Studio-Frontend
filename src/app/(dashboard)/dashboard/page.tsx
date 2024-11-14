"use client";

import {ContentLayout} from "@/components/dashboard/common/content-layout";
import {Breadcrumbs} from "@/components/client/common/breadcrumb";
import { Dashboard } from "@/components/dashboard/sections/home/dashboard";

const breadcrumbItems = [{title: "Dashboard", link: "/dashboard"}];
export default function Page() {
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems}/>
            <Dashboard/>
        </div>
    );
}
