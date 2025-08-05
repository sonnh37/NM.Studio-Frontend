"use client";
import { TypographyLarge } from "@/components/_common/typography/typography-large";
import { TypographySmall } from "@/components/_common/typography/typography-small";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { filterNavItemsByRole, NAV_CONFIG } from "@/configs/nav-config";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavMain } from "./nav-main";
import { NavManagement } from "./nav-management";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user?.user);

  if (!user) return null;

  const filteredNavMain = filterNavItemsByRole(
    NAV_CONFIG.main,
    user.role?.toString() ?? ""
  );
  const filteredNavManage = filterNavItemsByRole(
    NAV_CONFIG.management,
    user.role?.toString() ?? ""
  );

  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating">
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          size="lg"
          className="group overflow-visible data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-3 hover:bg-accent/50 transition-colors"
        >
          <Link href="/">
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
              <Icons.logo className="w-8" />
            </div>
            <div className="grid flex-1 text-left">
              <TypographyLarge className="truncate text-base font-semibold tracking-wide">
                NM.Studio
              </TypographyLarge>
              <TypographySmall className="text-muted-foreground truncate text-xs">
                Spa & Wedding
              </TypographySmall>
            </div>
          </Link>
        </SidebarMenuButton>
        <Separator />
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <NavMain items={filteredNavMain} />
        {filteredNavManage.length > 0 && (
          <>
            <Separator className="my-2" />
            <NavManagement items={filteredNavManage} />
          </>
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
