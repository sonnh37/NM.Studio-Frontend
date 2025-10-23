import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { navbarConst } from "@/lib/constants/navbar-const";
import { Category } from "@/types/entities/category";
import { Service } from "@/types/entities/service";
import { Album } from "@/types/entities/album";
import { User } from "@/types/entities/user";
import { UserContext } from "@/types/models/user-context";

// Dynamically import MainNav and MobileNav with React.memo
const MainNav = dynamic(
  () => import("../main-nav").then((mod) => mod.MainNav),
  { ssr: false }
);
const MobileNav = dynamic(
  () => import("../mobile-nav").then((mod) => mod.MobileNav),
  { ssr: false }
);

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
  const { visible, isTop } = useScrollVisibility();

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: isTop ? 0 : 0.5 }}
      className={cn(
        "sticky top-0 z-[1000] w-full  tracking-wider text-sm",
        "bg-transparent hover:bg-white dark:hover:bg-slate-950",
        "group backdrop-blur-3xl"
      )}
    >
      <div className="w-full flex justify-center">
        <div className="container flex h-14 items-center justify-between mx-auto">
          <MainNav
            categories={categories}
            services={services}
            albums={albums}
            user={user}
            items={navbarConst.mainNav}
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
