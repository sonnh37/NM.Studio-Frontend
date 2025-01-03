import React from "react";
import { cn } from "@/lib/utils"; // Tùy chỉnh nếu bạn có hàm `cn` cho classNames
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface MenuAnimationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}
const MenuAnimationLink = React.forwardRef<
  HTMLAnchorElement,
  MenuAnimationLinkProps
>(({ href, className, children, ...props }, ref) => {
  return (
    <Link
      href={href}
      ref={ref}
      className={cn(
        "relative leading-[2] text-foreground before:absolute before:bottom-[-0.25rem] before:right-0 before:w-0 before:h-[2px] before:rounded-sm before:bg-foreground before:transition-all before:duration-500 hover:before:w-full hover:before:left-0",
        className
      )}
      {...props}
    >
      {children}
      
    </Link>
    
  );
});

MenuAnimationLink.displayName = "MenuAnimationLink";

export default MenuAnimationLink;
