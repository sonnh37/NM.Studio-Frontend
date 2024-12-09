"use client";
import { siteConfig } from "@/config/site";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { ProductsCombobox } from "../../common/products-combobox";
import { CartSheet } from "../../common/cart-sheet";
import ChatButton from "../../common/chat-button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { throttle } from "lodash";

interface SiteHeaderProps {
  user: any | null;
}

export default function SiteHeader({ user }: SiteHeaderProps) {
  const pathUrl = usePathname();

  return (
    <header
  className={cn(
    "sticky top-0 z-[1000] w-full transition-colors duration-300 border-b bg-background"
  )}
>
      <div className="bg-neutral-600 text-white font-extralight dark:text-black">
        <div className="h-[40px] w-full flex justify-center">
          {/* Content constrained to max-w-7xl */}
          <div className="container w-full flex justify-between items-center flex-row mx-auto">
            <div className="flex space-x-4">
              <div>
                <i className="fa-solid fa-phone"></i> 0908145344
              </div>
              <div>
                <i className="fa-regular fa-envelope"></i> nhumystudio@gmail.com
              </div>
            </div>
            <div className="flex space-x-4">
              <ChatButton />
            </div>

            <div className="flex space-x-4 items-center">
              <div>
                <a href="/about">ABOUT NHUMY</a>
              </div>
              <div>|</div>
              <div>
                <a href="">Liên hệ</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="container flex h-16 items-center">
          <MainNav items={siteConfig.mainNav} />
          <MobileNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              <ProductsCombobox />
              <CartSheet />
              {/* <LocaleSwitcher /> */}
              {/* <AuthDropdown user={user} /> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
