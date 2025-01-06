"use client";

import {Breadcrumbs} from "@/components/_common/breadcrumb";

const breadcrumbItems = [{title: "Dashboard", link: "/dashboard"}];
export default function Page() {
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems}/>
            {/*<Dashboard/>*/}
        </div>
    );
}
