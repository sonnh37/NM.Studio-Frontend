import {ModeToggle} from "@/components/common/mode-toggle";
import {UserNav} from "@/components/dashboard/common/user-nav";
import {SheetMenu} from "@/components/dashboard/common/sheet-menu";
import DynamicBreadcrumbs from "@/components/common/dynamic-breadcrumbs";
import {ProductsCombobox} from "@/components/client/common/products-combobox";

export function Navbar() {
    return (
        <header
            className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu/>
                    <h1 className="font-bold"><DynamicBreadcrumbs/></h1>
                </div>
                <div className="flex flex-1 items-center gap-2 justify-end">
                    <ProductsCombobox />
                    <ModeToggle/>
                    <UserNav/>
                </div>
            </div>
        </header>
    );
}
