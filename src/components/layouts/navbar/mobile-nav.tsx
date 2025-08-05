"use client";

import type { MainNavItem } from "@/types/models";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import dynamic from "next/dynamic";
import { AuthDropdown } from "../../_common/auth-dropdown";
import { ProductsCombobox } from "@/components/_common/products-combobox";
import { ModeToggle } from "../../_common/mode-toggle";

interface MobileNavProps {
  items?: MainNavItem[];
  user?: User | null;
}

export function MobileNav({ items, user = null }: MobileNavProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = React.useState(false);

  if (isDesktop) return null;

  const updatedItems = [...(items || [])];

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Icons.menu aria-hidden="true" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pl-1 pr-0 pt-9">
          <SheetHeader className="px-1 sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="w-full px-7">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icons.logo className="mr-2 size-4" aria-hidden="true" />
              {/* <span className="font-bold">{navbarConst.name}</span>
              <span className="sr-only">Home</span> */}
            </Link>
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="pl-1 pr-7">
              <Accordion type="multiple" className="w-full">
                {updatedItems?.map((item, index) => (
                  <AccordionItem value={item.title} key={index}>
                    <AccordionTrigger className="text-sm capitalize">
                      <Link href={String(item.href)}>{item.title}</Link>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.items?.map((subItem, index) =>
                          subItem.href ? (
                            <MobileLink
                              key={index}
                              href={String(subItem.href)}
                              segment={String(segment)}
                              setOpen={setOpen}
                              disabled={subItem.disabled}
                              className="m-1"
                            >
                              {subItem.title}
                            </MobileLink>
                          ) : (
                            <div
                              key={index}
                              className="text-foreground/70 transition-colors"
                            >
                              {item.title}
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="flex lg:hidden flex-1 items-center justify-end space-x-4">
        <nav className="flex items-center">
          <ModeToggle />
          <ProductsCombobox />
          {/* <CartSheet /> */}
          <AuthDropdown user={user} />
        </nav>
      </div>
    </>
  );
}

interface MobileLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  disabled?: boolean;
  segment: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={() => {
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
