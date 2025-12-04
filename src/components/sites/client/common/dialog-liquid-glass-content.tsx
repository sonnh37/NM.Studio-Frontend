import * as DialogPrimitive from "@radix-ui/react-dialog";
import { BarChart2, Bell, Home, Search, Settings } from "lucide-react";
import * as React from "react";

import { LiquidGlassCard } from "@/components/liquid-glass";

export function DialogLiquidGlassContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <LiquidGlassCard
      glowIntensity="sm"
      shadowIntensity="sm"
      borderRadius="12px"
      blurIntensity="sm"
      draggable
      className="p-4 w-[280px]"
    >
      <nav className="space-y-2 w-full relative z-30 ">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-gray-800 font-medium transition-colors hover:bg-gray-100"
          aria-current="page"
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-colors hover:bg-white/20">
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-colors hover:bg-white/20">
          <BarChart2 className="w-5 h-5" />
          <span>Sales Analytics</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-colors hover:bg-white/20">
          <Bell className="w-5 h-5" />
          <span>Notification</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-colors hover:bg-white/20">
          <Settings className="w-5 h-5" />
          <span>Account Settings</span>
        </button>
      </nav>
    </LiquidGlassCard>
  );
}
