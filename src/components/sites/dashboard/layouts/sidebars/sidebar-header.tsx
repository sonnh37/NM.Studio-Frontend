import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";

export default function SidebarHeader() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  return (
    <>
      <Button
        className={cn(
          "transition-transform ease-in-out duration-300 mb-1",
          sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
        )}
        variant="link"
        asChild
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <Icons.logo
            className={sidebar?.isOpen === true ? "size-11" : "size-7"}
            aria-hidden="true"
          />
          {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
          {/* <h1
          className={cn(
            "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
            sidebar?.isOpen === false
              ? "-translate-x-96 opacity-0 hidden"
              : "translate-x-0 opacity-100"
          )}
        >
          NM.Studio
        </h1> */}
        </Link>
      </Button>
    </>
  );
}
