import {usePathname} from "next/navigation";
import DynamicBreadcrumbs from "@/components/common/dynamic-breadcrumbs";

export default function BreadcrumbClient() {
    const pathname = usePathname();
    return (
        <div className="bg-neutral-200">
            {pathname !== "/" && (
                <div className="container mx-auto flex justify-center items-center py-6">
                    <DynamicBreadcrumbs/>
                </div>
            )}
        </div>
    );
}