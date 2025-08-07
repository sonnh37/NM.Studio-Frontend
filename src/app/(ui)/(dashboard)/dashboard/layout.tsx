"use client";
import { AuthDropdown } from "@/components/_common/auth-dropdown";
import DynamicBreadcrumbs from "@/components/_common/breadcrumbs/dynamic-breadcrumbs";
// import { ChatPopover } from "@/components/_common/chat-popover";
import { ModeToggle } from "@/components/_common/mode-toggle";
// import { NotificationPopover } from "@/components/_common/notification-popover";
import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import { Card } from "@/components/ui/card"; // Thêm Card component
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { RootState } from "@/lib/redux/store";
import { Role } from "@/types/entities/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user?.role === Role.Customer) {
      router.push("/");
    }
  }, [user, router]);

  if (user?.role === Role.Customer) return null;

  return (
    <SidebarProvider
      className="h-screen overflow-hidden"
      style={
        {
          "--sidebar-width": "18rem",
          // "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumbs />
            <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
            {/* <NotificationPopover /> */}
            {/* <ChatPopover /> */}
            <AuthDropdown user={user} />
          </div>
          </div>

          
        </header>

        <div className="flex flex-1 flex-col overflow-hidden gap-4 mt-4">
          <div className="flex-1 overflow-hidden p-0">
            <div className="px-4 lg:gap-2 lg:px-6 h-full w-full overflow-auto">
              {/* {!isLock ? (
                <>{children}</>
              ) : (
                <>
                  <AlertMessage
                    message="Chưa tới đợt. Vui lòng quay lại sau!"
                    messageType="info"
                  />
                </>
              )}
               */}
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
