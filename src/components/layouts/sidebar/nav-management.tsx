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
import { ScrollArea } from "@/components/ui/scroll-area";

export function NavManagement({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
    isActive?: boolean;
    disable?: boolean;
    items?: {
      title: string;
      icon?: LucideIcon | IconType;
      disable?: boolean;
      url: string;
    }[];
  }[];
}) {
  const styleCommon =
    " group-data-[collapsible=icon]:p-[6px]! transition-colors duration-200 ease-in-out";
  const pathName = usePathname();
  return (
    <ScrollArea className="h-full">
      <SidebarGroup>
        <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathName === item.url || pathName.startsWith(item.url + "/");
            const isDisabled = item.disable ?? false;

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                disabled={isDisabled}
                className="group/collapsible"
              >
                {item.items ? (
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          styleCommon,
                          isActive ? "bg-muted! " : "",
                          "py-4"
                        )}
                      >
                        <div className="flex aspect-square size-4 items-center justify-start">
                          {item.icon && <item.icon />}
                        </div>
                        <span>{item.title}</span>
                        {isActive && <div className="ml-auto">|</div>}

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                      <SidebarMenuSub className="pr-0 mx-0 ml-3.5">
                        {item.items?.map((subItem) => {
                          const isActiveSub = pathName === subItem.url;
                          const isDisabledSub = subItem.disable ?? false;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                className={cn(
                                  styleCommon,
                                  isActiveSub ? "bg-muted! " : "",
                                  isDisabledSub
                                    ? "opacity-50 cursor-not-allowed"
                                    : "",
                                  "py-2.5"
                                )}
                                isActive={isActiveSub}
                                asChild
                              >
                                <Link href={subItem.url}>
                                  <div className="flex aspect-square size-4 items-center justify-start">
                                    {subItem.icon && <subItem.icon />}
                                  </div>
                                  <span>{subItem.title}</span>
                                  {isActiveSub && (
                                    <div className="ml-auto">|</div>
                                  )}
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
                      isActive ? "bg-muted! " : "",
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    disabled={isDisabled}
                    tooltip={item.title}
                    asChild
                    isActive={isActive}
                  >
                    <Link href={item.url} className="flex items-center w-full">
                      <div className="flex aspect-square size-4 items-center justify-start">
                        {item.icon && <item.icon />}
                      </div>
                      <span className="ml-2">{item.title}</span>
                      {isActive && <div className="ml-auto">|</div>}
                    </Link>
                  </SidebarMenuButton>
                )}
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </ScrollArea>
  );
}
