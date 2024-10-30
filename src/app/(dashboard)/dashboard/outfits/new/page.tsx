"use client"
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {OutfitForm} from "@/components/dashboard/tables/outfits/create-update-form";
import {ContentLayout} from "@/components/dashboard/content-layout";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Outfit', link: '/dashboard/outfit'},
    {title: 'New', link: '/dashboard/outfit/new'},
];
export default function Page() {
    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <OutfitForm initialData={null}/>
            </div>
        </ContentLayout>
    )
}
