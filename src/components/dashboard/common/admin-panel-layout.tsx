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
    <div>
      <Sidebar />
      <main
        className={cn(
          "transition-[margin-left] ease-in-out bg-neutral-50 dark:bg-background duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64 "
        )}
      >
        <div
          className={cn(
            "shadow-lg drop-shadow-2xl"
            // sidebar?.isOpen === false
            //   ? ""
            //   : "shadow-xl drop-shadow-md"
          )}
        >
          <div className="bg-background dark:bg-background">{children}</div>
        </div>
      </main>
      {/* <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[60px]" : "lg:ml-64"
                )}
            >
                <Footer/>
            </footer> */}
    </div>
  );
}
