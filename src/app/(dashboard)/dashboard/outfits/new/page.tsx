"use client"
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ProductForm} from "@/components/dashboard/tables/products/create-update-form";
import {ContentLayout} from "@/components/dashboard/content-layout";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Product', link: '/dashboard/product'},
    {title: 'New', link: '/dashboard/product/new'},
];
export default function Page() {
    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <ProductForm initialData={null}/>
            </div>
        </ContentLayout>
    )
}
