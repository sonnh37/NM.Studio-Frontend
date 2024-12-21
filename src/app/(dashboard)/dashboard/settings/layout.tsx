// layouts/SettingsLayout.tsx
'use client';
import dynamic from 'next/dynamic';
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import userSerice from "@/services/user-serice";
import PageLoading from "@/components/common/page-loading";
import NotFound from "@/components/client/not-found";
import { constant } from 'lodash';

// Dữ liệu sidebar
const sidebarNavItems = [
  { title: "Profile", href: "/dashboard/settings" },
  { title: "Password and security", href: "/dashboard/settings/password-security" },
  { title: "Appearance", href: "/dashboard/settings/appearance" },
  { title: "Notifications", href: "/dashboard/settings/notifications" },
  { title: "Display", href: "/dashboard/settings/display" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps){
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block tracking-wide">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {/* Truyền `user` vào `children` */}
          {children}
        </div>
      </div>
    </div>
  );
};
