"use client";
import AdminPanelLayout from "@/components/dashboard/common/admin-panel-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentLayout } from "@/components/dashboard/common/content-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleChat } from "@/lib/slices/chatSlice";
import "./dashboard.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import KBar from "@/components/dashboard/kbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <SidebarProvider>
        <AdminPanelLayout>
          <ContentLayout>{children}</ContentLayout>
        </AdminPanelLayout>
      </SidebarProvider>
    </KBar>
  );
}
