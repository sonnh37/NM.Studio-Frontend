import {usePathname} from "next/navigation";
import DynamicBreadcrumbs from "@/components/common/dynamic-breadcrumbs";
import { Separator } from "@/components/ui/separator";

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