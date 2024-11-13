"use client"
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import { ProductForm } from "@/components/dashboard/sections/products/create-update-form";
import {Const} from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: Const.DASHBOARD_URL},
    {title: 'Products', link: Const.DASHBOARD_PRODUCT_URL},
    {title: 'New', link: Const.DASHBOARD_PRODUCT_NEW_URL},
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
