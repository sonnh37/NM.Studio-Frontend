import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { navbarConst } from "@/lib/constants/navbar-const";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const MainNav = dynamic(
  () => import("../main-nav").then((mod) => mod.MainNav),
  { ssr: false }
);
const MobileNav = dynamic(
  () => import("../mobile-nav").then((mod) => mod.MobileNav),
  { ssr: false }
);

interface HeaderMainProps {
  user?: User | null;
}

export const HeaderMain = ({ user }: HeaderMainProps) => {
  const { visible, isTop } = useScrollVisibility();

  return (
    <div
      className={cn(
        "transition-colors duration-300 tracking-wider text-sm bg-white",
        "group backdrop-blur-3xl"
      )}
    >
      <div className="w-full flex justify-center">
        <div className="container flex  items-end justify-between mx-auto">
          <MainNav user={user}/>
          <MobileNav items={navbarConst.mainNav} user={user} />
        </div>
      </div>
    </div>
  );
};
