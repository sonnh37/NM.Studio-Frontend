"use client";
import {usePathname} from "next/navigation";
import { Breadcrumbs } from "./breadcrumb";

export default function DynamicBreadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = "/" + pathSegments.slice(0, index + 1).join("/");
        const title = segment.charAt(0).toUpperCase() + segment.slice(1);

        return {title, link: path};
    });

    return <Breadcrumbs items={breadcrumbItems}/>;
}
