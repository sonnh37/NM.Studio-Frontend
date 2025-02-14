"use client";

import Link from "next/link";
import {useState} from "react";
import {ChevronDown, LucideIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {DropdownMenuArrow} from "@radix-ui/react-dropdown-menu";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

interface CollapseMenuButtonProps {
    icon: React.ElementType;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
}

export function CollapseMenuButton({
                                       icon,
                                       label,
                                       active,
                                       submenus,
                                       isOpen,
                                   }: CollapseMenuButtonProps) {
    const isSubmenuActive = submenus.some((submenu) => submenu.active);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

    const renderIcon = () => {
        // Kiểm tra nếu icon là một function (LucideIcon)
        if (typeof icon === "function") {
            const IconComponent = icon as LucideIcon;
            return <IconComponent size={18}/>;
        }

        // Kiểm tra nếu icon là một ReactNode hoặc là một Image
        return (
            icon || (
                <Image
                    src="/default-icon.png"
                    alt="Default Icon"
                    width={18}
                    height={18}
                />
            )
        );
    };

    return isOpen ? (
        <Collapsible
            open={isCollapsed}
            onOpenChange={setIsCollapsed}
            className="w-full"
        >
            <CollapsibleTrigger
                className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
                asChild
            >
                <Button
                    variant={active ? "secondary" : "ghost"}
                    className={`w-full justify-start hover:shadow-xl  h-10 ${
                        active ? "shadow-lg" : ""
                    }`}
                >
                    <div className="w-full items-center flex justify-between">
                        <div className="flex items-center">
              <span className="mr-4">
                {renderIcon()} {/* Render icon */}
              </span>
                            <p
                                className={cn(
                                    "max-w-[150px] truncate",
                                    isOpen
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-96 opacity-0"
                                )}
                            >
                                {label}
                            </p>
                        </div>
                        <div
                            className={cn(
                                "whitespace-nowrap",
                                isOpen
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-96 opacity-0"
                            )}
                        >
                            <ChevronDown
                                size={18}
                                className="transition-transform duration-200"
                            />
                        </div>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent
                className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="relative space-x-4 my-1 ml-6">
                    <span className="bg-gray-300 w-[1px] left-0 top-0 absolute h-full"></span>
                    <div className="grid gap-1 w-[80%]">
                        {submenus.map(({href, label, active}, index) => (
                            <Button
                                key={index}
                                variant={active ? "secondary" : "ghost"}
                                className={cn(`w-full justify-start h-8`, active ? `shadow-inner` : ``)}
                                asChild
                            >
                                <Link href={href}>
                                    <p
                                        className={cn(
                                            "max-w-[170px] truncate",
                                            isOpen
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-96 opacity-0"
                                        )}
                                    >
                                        {label}
                                    </p>
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    ) : (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={active ? "secondary" : "ghost"}
                                className="w-full justify-start h-10 mb-1"
                            >
                                <div className="w-full items-center flex justify-between">
                                    <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      {renderIcon()} {/* Render icon */}
                    </span>
                                        <p
                                            className={cn(
                                                "max-w-[200px] truncate",
                                                isOpen === false ? "opacity-0" : "opacity-100"
                                            )}
                                        >
                                            {label}
                                        </p>
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" alignOffset={2}>
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent side="right" sideOffset={25} align="start">
                <DropdownMenuLabel className="max-w-[190px] truncate">
                    {label}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {submenus.map(({href, label}, index) => (
                    <DropdownMenuItem key={index} asChild>
                        <Link className="cursor-pointer" href={href}>
                            <p className="max-w-[180px] truncate">{label}</p>
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuArrow className="fill-border"/>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
