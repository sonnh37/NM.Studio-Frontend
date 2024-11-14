"use client";

import {Breadcrumbs} from "@/components/client/common/breadcrumb";
import {ContentLayout} from "@/components/dashboard/common/content-layout";
import {ServiceForm} from "@/components/dashboard/sections/services/create-update-form";
import { Const } from "@/lib/const";

export default function Page() {
    return (
            <div className="space-y-6">
                <ServiceForm initialData={null}/>
            </div>
    );
}


