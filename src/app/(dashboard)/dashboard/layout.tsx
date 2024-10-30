"use client";
import AdminPanelLayout from "@/components/dashboard/admin-panel-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </QueryClientProvider>
  );
}
