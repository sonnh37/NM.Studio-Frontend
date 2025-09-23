"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { MainNavItem } from "@/types";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/ui/icons";
import dynamic from "next/dynamic";
import { User } from "@/types/entities/user";
import { AuthDropdown } from "./auth-dropdown";
import { Category } from "@/types/entities/category";
import { Album } from "@/types/entities/album";
import { Service } from "@/types/entities/service";
const ModeToggle = dynamic(
  () => import("./mode-toggle").then((mod) => mod.ModeToggle),
  { ssr: true }
);
const ProductsCombobox = dynamic(
  () =>
    import("../../common/products-combobox").then(
      (mod) => mod.ProductsCombobox
    ),
  { ssr: true }
);
const CartSheet = dynamic(
  () => import("../../common/cart-sheet").then((mod) => mod.CartSheet),
  { ssr: true }
);

interface MobileNavProps {
  items?: MainNavItem[];
  user?: UserContext | null;
  categories: Category[];
  services: Service[];
  albums: Album[];
}

export function MobileNav({
  items,
  user = null,
  categories = [],
  services = [],
  albums = [],
}: MobileNavProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = React.useState(false);

  if (isDesktop) return null;

  const updatedItems = [...(items || [])];

  updatedItems.push({
    title: "Danh mục",
    href: "/products",
    items: categories.map((category) => ({
      title: category.name ?? "N/A",
      href: `/products?categoryName=${category.name}`,
      items:
        category.subCategories?.map((subCategory) => ({
          title: subCategory.name ?? "N/A",
          href: `/products?categoryName=${category.name}&subCategoryName=${subCategory.name}`,
          items: [],
        })) ?? [],
    })),
  });

  updatedItems.push({
    title: "Dịch vụ",
    href: "/services",
    items: services.map((service) => ({
      title: service.name ?? "N/A",
      href: `/services/${service.slug}`,
      items: [],
    })),
  });

  updatedItems.push({
    title: "Albums",
    href: "/albums",
    items: albums.map((album) => ({
      title: album.title ?? "N/A",
      href: `/albums/${album.slug}`,
      items: [],
    })),
  });

  updatedItems.push({
    title: "Kinh nghiệm cưới",
    href: "/blogs",
  });

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
        <SheetContent side="left" className="pl-1 z-[1002] pr-0 pt-9">
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
                    <AccordionTrigger  className="text-sm capitalize">
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
        <nav className="flex items-center space-x-4">
          {/* <ModeToggle /> */}
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
