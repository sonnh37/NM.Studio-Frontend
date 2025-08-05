"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { useState, useRef, useEffect } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
    isActive?: boolean;
    items?: {
      title: string;
      icon?: LucideIcon | IconType;
      url: string;
    }[];
  }[];
}) {
  const styleCommon = " group-data-[collapsible=icon]:!p-[6px] transition-colors duration-200 ease-in-out"
  const pathName = usePathname();
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathName === item.url ||
            (pathName.startsWith(item.url + "/"));
            
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              {item.items ? (
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      className={cn(
                        styleCommon,
                        isActive ? "!bg-orange-500 !text-white" : "",
                        "py-4"
                      )}
                    >
                      <div className="flex aspect-square size-4 items-center justify-start">
                        {item.icon && <item.icon />}
                      </div>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="pr-0 mx-0 ml-3.5">
                      {item.items?.map((subItem) => {
                        const isActiveSub = pathName === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              className={cn(
                                styleCommon,
                                isActiveSub ? "!bg-orange-500 !text-white" : "",
                                "py-2.5"
                              )}
                                
                              asChild
                            >
                              <Link href={subItem.url}>
                                <div className="flex aspect-square size-4 items-center justify-start">
                                  {subItem.icon && <subItem.icon />}
                                </div>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuButton
                  className={cn(
                    styleCommon,
                    "py-4",
                    isActive ? "!bg-orange-500 !text-white" : ""
                  )}
                  tooltip={item.title}
                  asChild
                  // isActive={isActive}
                >
                  <Link href={item.url}>
                    <div className="flex aspect-square size-4 items-center justify-start">
                      {item.icon && <item.icon />}
                    </div>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
