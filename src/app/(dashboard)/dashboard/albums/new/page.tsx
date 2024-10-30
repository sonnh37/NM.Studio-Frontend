"use client";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {AlbumForm} from "@/components/dashboard/tables/albums/create-update-form";
import {Breadcrumbs} from "@/components/client/breadcrumb";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "Album", link: "/dashboard/album"},
    {title: "New", link: "/dashboard/album/new"},
];
export default function Page() {
    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <AlbumForm initialData={null}/>
            </div>
        </ContentLayout>
    );
}
