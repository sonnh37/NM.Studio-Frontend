import {cn} from "@/lib/utils";
import {useStore} from "@/hooks/use-store";
import {Menu} from "@/components/dashboard/common/menu";
import {useSidebarToggle} from "@/hooks/use-sidebar-toggle";
import SidebarHeader from "./sidebar-header";
import {SidebarFooter} from "./sidebar-footer";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/types/user";
import userSerice from "@/services/user-serice";
import {useDispatch} from "react-redux";
import {setUser} from "@/lib/slices/userSlice";

export function Sidebar() {
    const dispatch = useDispatch();
    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["fetchUser"],
        queryFn: async () => {
            const res = await userSerice.getCurrentUser();
            console.log("check_user", res)
            dispatch(setUser(res.data ?? ({} as User)));
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

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
