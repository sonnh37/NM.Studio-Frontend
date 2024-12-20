"use client";
import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll
} from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

const MainNav = dynamic(() => import("./main-nav").then((mod) => mod.MainNav), {
  ssr: true,
});
const MobileNav = dynamic(
  () => import("./mobile-nav").then((mod) => mod.MobileNav),
  { ssr: true }
);
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
const ChatButton = dynamic(() => import("../../common/chat-button"), {
  ssr: true,
});

interface SiteHeaderProps {
  user: any | null;
}

export default function SiteHeader({ user }: SiteHeaderProps) {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const scrollHeight = document.body.scrollHeight;
  
    const fivePercentHeight = scrollHeight * 0.2;
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
      const currentScroll = scrollYProgress.get() * scrollHeight;
  
      if (currentScroll < fivePercentHeight) {
        setVisible(true);
        setIsTop(true);
      } else {
        setIsTop(false);
  
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <div className="bg-neutral-600 transition-colors duration-300 text-white font-extralight dark:text-white">
        <div className="h-[40px] w-full flex justify-center">
          <div className="container w-full flex justify-between items-center flex-row mx-auto">
            <div className="hidden space-x-4 lg:flex">
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

            <div className="hidden sm:flex  space-x-4 justify-end w-[327px] max-w-[327px] items-center">
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
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: isTop ? 0 : 0.5, 
        }}
        className={cn(
          "sticky top-0 z-[1000] w-full transition-colors duration-300",
          "bg-transparent hover:bg-white dark:hover:bg-slate-950",
          "group backdrop-blur-3xl"
        )}
      >
        <div className="w-full flex justify-center">
          <div className="container flex h-14 items-center justify-between mx-auto">
            <MainNav items={siteConfig.mainNav} />
            <MobileNav items={siteConfig.mainNav} />
            <div className="flex lg:hidden flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-4">
                <ModeToggle />
                <ProductsCombobox />
                <CartSheet />
                {/* <LocaleSwitcher /> */}
                {/* <AuthDropdown user={user} /> */}
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
