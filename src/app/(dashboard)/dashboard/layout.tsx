"use client";
import AdminPanelLayout from "@/components/dashboard/common/admin-panel-layout";
import { ContentLayout } from "@/components/dashboard/common/content-layout";
import KBar from "@/components/dashboard/kbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import "./dashboard.css";
import { UserAccessControl } from "@/components/common/user-access-control";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserAccessControl>
      <KBar>
        <SidebarProvider>
          <AdminPanelLayout>
            <ContentLayout>{children}</ContentLayout>
          </AdminPanelLayout>
        </SidebarProvider>
        <Toaster />
      </KBar>
    </UserAccessControl>
  );
}
