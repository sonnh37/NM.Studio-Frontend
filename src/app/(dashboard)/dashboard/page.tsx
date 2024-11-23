"use client";

import {Breadcrumbs} from "@/components/common/breadcrumb";

const breadcrumbItems = [{title: "Dashboard", link: "/dashboard"}];
export default function Page() {
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems}/>
            {/*<Dashboard/>*/}
        </div>
    );
}
