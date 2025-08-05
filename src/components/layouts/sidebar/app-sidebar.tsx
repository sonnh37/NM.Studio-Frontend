"use client";
import { TypographyLarge } from "@/components/_common/typography/typography-large";
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
import { useCurrentRole, useCurrentSemester } from "@/hooks/use-current-role";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { semesterService } from "@/services/semester-service";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavMain } from "./nav-main";
import { NavManagement } from "./nav-management";
import { RoleSwitcher } from "./role-switcher";
import { TypographyP } from "@/components/_common/typography/typography-p";
import {
  initializeCache,
  updateUserCache,
  UserCache,
} from "@/lib/redux/slices/cacheSlice";
import { useTheme } from "next-themes";
import { TypographySmall } from "@/components/_common/typography/typography-small";
import { SemesterSwitcher } from "./semester-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user?.user);
  const role = useCurrentRole();

  if (!user) return null;

  const filteredNavMain = filterNavItemsByRole(NAV_CONFIG.main, role as string);
  const filteredNavManage = filterNavItemsByRole(
    NAV_CONFIG.management,
    role as string
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
                Team Matching
              </TypographyLarge>
              <TypographySmall className="text-muted-foreground truncate text-xs">
                Đại học FPT
              </TypographySmall>
            </div>
          </Link>
        </SidebarMenuButton>
        <Separator />
        <div>
          <SemesterSwitcher />
          <RoleSwitcher  />

        </div>
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
