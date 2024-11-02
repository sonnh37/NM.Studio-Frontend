"use client"
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import { ProductForm } from "@/components/dashboard/sections/courses/create-update-form";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Product', link: '/dashboard/product'},
    {title: 'New', link: '/dashboard/product/new'},
];
export default function Page() {
    return (
        <ContentLayout title="Product">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <ProductForm initialData={null}/>
            </div>
        </ContentLayout>
    )
}
