import { Menu } from "@/components/dashboard/common/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { SidebarFooter } from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";

export function Sidebar() {
    const user = useSelector((state: RootState) => state.user.user);
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                "fixed top-0  shadow-none left-0  z-0 h-screen scrollbar-hide -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-[90px]" : "w-64"
            )}
        >
            {/* <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} /> */}
            <div className="relative h-full flex flex-col py-4 overflow-hidden ">
                <SidebarHeader/>
                <Menu isOpen={sidebar?.isOpen}/>
                <SidebarFooter user={user ?? {} as User}/>
            </div>
        </aside>
    );
}
