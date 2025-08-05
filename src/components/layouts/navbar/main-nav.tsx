"use client";
import { AuthDropdown } from "@/components/_common/auth-dropdown";
import { ChatPopover } from "@/components/_common/chat-popover";
import { ModeToggle } from "@/components/_common/mode-toggle";
import { NotificationPopover } from "@/components/_common/notification-popover";
import { Search } from "@/components/_common/search";
import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { TypographyInlinecode } from "@/components/_common/typography/typography-inline-code";
import { TypographyLarge } from "@/components/_common/typography/typography-large";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { User } from "@/types/user";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface MainNavProps {
  user?: User | null;
}

export function MainNav({ user = null }: MainNavProps) {
  return (
    <div className="flex flex-col w-full py-2">
      <div className="hidden lg:flex overflow-hidden w-full justify-between mx-auto gap-6 text-lg">
        <div className="flex flex-row gap-4 w-full pt-3">
          <div className="ml-3 py-2 flex justify-center">
            <Button asChild variant={"ghost"}>
              <Link href={"/"} className="px-6">
                <Icons.logo className="w-24" />
                <TypographyLarge className="tracking-wider">
                   {"Team Matching"}
                </TypographyLarge>
              </Link>
            </Button>
          </div>
          <div className="w-[80%]  border rounded-xl flex justify-start text-center">
            <Search />
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <ChatPopover />
            <NotificationPopover />
            <AuthDropdown user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DropdownProps {
  label: string;
  children: ReactNode;
}

function Dropdown({ label, children }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-orange-100 uppercase data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            {label}
            <ChevronDown
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" sideOffset={0}>
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface DropdownItemProps {
  href: string;
  title: string;
}

function DropdownItem({ href, title }: DropdownItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <DropdownMenuItem asChild>
      <Link
        href={href}
        className={`w-full text-left block py-2 px-4 hover:bg-accent ${
          isActive ? "bg-accent text-accent-foreground" : ""
        }`}
      >
        {title}
      </Link>
    </DropdownMenuItem>
  );
}
function LinkItem({ href, title }: DropdownItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={`text-orange-100 uppercase data-[state=open]:bg-accent data-[state=open]:text-accent-foreground ${
        isActive ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
}
