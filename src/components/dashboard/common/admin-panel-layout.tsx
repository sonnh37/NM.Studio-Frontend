"use client";

import { Sidebar } from "@/components/dashboard/layouts/sidebars/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-orange-50 from-5% via-red-50 via-10% to-blue-100 to-80%",
        "dark:bg-none dark:bg-neutral-900"
      )}
    >
      <Sidebar />
      <main
        className={cn(
          "transition-[margin-left] ease-in-out  duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64 "
        )}
      >
        <div className={cn("shadow-sm drop-shadow-xl")}>
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
}
