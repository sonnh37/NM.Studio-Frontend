"use client";
import {ContentLayout} from "@/components/dashboard/common/content-layout";
import {Breadcrumbs} from "@/components/client/common/breadcrumb";
import DataTableAlbums from "@/components/dashboard/tables/albums";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "Album", link: "/dashboard/album"},
];
export default function Page() {
    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <DataTableAlbums/>
            </div>
        </ContentLayout>
    );
}
