import { ModeToggle } from "@/components/common/mode-toggle";
import { UserNav } from "@/components/dashboard/common/user-nav";
import { SheetMenu } from "@/components/dashboard/common/sheet-menu";
import DynamicBreadcrumbs from "@/components/common/dynamic-breadcrumbs";
import { ProductsCombobox } from "@/components/dashboard/common/products-combobox";
import { SidebarToggle } from "@/components/common/sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoSidebarExpand } from "react-icons/go";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-20 w-full bg-background  ",
          sidebar?.isOpen === false ? "" : ""
        )}
      >
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 gap-4 lg:space-x-0">
            <Button
              onClick={() => sidebar?.setIsOpen?.()}
              className="border-none shadow-none w-8 h-8"
              variant="outline"
              size="icon"
            >
              <GoSidebarExpand
                className={cn(
                  "h-4 w-4 transition-transform ease-in-out duration-700",
                  sidebar.isOpen === false ? "rotate-180" : "rotate-0"
                )}
              />
            </Button>

            <SheetMenu />
            <h1 className="font-bold">
              <DynamicBreadcrumbs />
            </h1>
          </div>
          <div className="flex flex-1 items-center gap-2 justify-end">
            <ProductsCombobox />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
        <Separator />
      </header>
    </>
  );
}
