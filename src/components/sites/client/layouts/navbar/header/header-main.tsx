import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { navbarConst } from "@/lib/constants/navbar-const";
import { cn } from "@/lib/utils";
import { Album } from "@/types/entities/album";
import { Category } from "@/types/entities/category";
import { Service } from "@/types/entities/service";
import { UserContext } from "@/types/models/user-context";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MainNav } from "../main-nav";
import { MobileNav } from "../mobile-nav";

interface HeaderMainProps {
  categories: Category[];
  services: Service[];
  albums: Album[];
  user?: UserContext | null;
}

export const HeaderMain = ({
  categories,
  services,
  albums,
  user,
}: HeaderMainProps) => {
  const { visible, isTop, shouldAnimate } = useScrollVisibility();

  return (
    <motion.div
      // initial={{ y: 0, opacity: 1 }}
      // animate={
      //   shouldAnimate
      //     ? {
      //         y: visible ? 0 : -100,
      //         opacity: visible ? 1 : 0.8,
      //       }
      //     : {}
      // }
      // transition={
      //   shouldAnimate
      //     ? {
      //         duration: 0.3,
      //         ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      //       }
      //     : {}
      // }
      className={cn(
        "sticky top-0 z-50 w-full tracking-wider text-sm",
        "bg-transparent backdrop-blur-md ",
        "transition-all duration-300",
        !isTop && "shadow-sm"
      )}
    >
      <div className="w-full flex justify-center">
        <div className="container flex h-12 items-center justify-between mx-auto">
          <MainNav
            categories={categories}
            services={services}
            albums={albums}
            user={user}
          />
          <MobileNav
            items={navbarConst.mainNav}
            categories={categories}
            services={services}
            albums={albums}
            user={user}
          />
        </div>
      </div>
    </motion.div>
  );
};
