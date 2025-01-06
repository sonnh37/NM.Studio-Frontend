import {usePathname} from "next/navigation";
import DynamicBreadcrumbs from "@/components/_common/dynamic-breadcrumbs";

export default function BreadcrumbClient() {
    const pathname = usePathname();
    return (
        <div className="container mx-auto">
            {/* <Separator/> */}
            {pathname !== "/" && (
                <div className="flex justify-center items-center py-6">
                    
                    <DynamicBreadcrumbs/>
                </div>
            )}
        </div>
    );
}