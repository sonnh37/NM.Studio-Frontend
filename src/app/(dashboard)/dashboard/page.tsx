"use client";

import {ContentLayout} from "@/components/dashboard/content-layout";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import { Dashboard } from "@/components/dashboard/sections/home/dashboard";

const breadcrumbItems = [{title: "Dashboard", link: "/dashboard"}];
export default function Page() {
    return (
        <ContentLayout title="Dashboard">
            <Breadcrumbs items={breadcrumbItems}/>
            <Dashboard/>
        </ContentLayout>
    );
}
