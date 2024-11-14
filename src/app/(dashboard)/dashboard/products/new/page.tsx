"use client"
import {Breadcrumbs} from "@/components/client/common/breadcrumb";
import {ContentLayout} from "@/components/dashboard/common/content-layout";
import { ProductForm } from "@/components/dashboard/sections/products/create-update-form";
import {Const} from "@/lib/const";

const breadcrumbItems = [
    {title: 'Dashboard', link: Const.DASHBOARD_URL},
    {title: 'Products', link: Const.DASHBOARD_PRODUCT_URL},
    {title: 'New', link: Const.DASHBOARD_PRODUCT_NEW_URL},
];
export default function Page() {
    return (
            <div className="space-y-6">
                <ProductForm initialData={null}/>
            </div>
    )
}
