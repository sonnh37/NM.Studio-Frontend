import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuAnimationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}

const MenuAnimationLink = ({
  href,
  className,
  children,
  ...props
}: MenuAnimationLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative leading-loose text-foreground before:absolute before:-bottom-1 before:right-0 before:w-0 before:h-[2px] before:rounded-sm before:bg-foreground before:transition-all before:duration-500 hover:before:w-full hover:before:left-0",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default MenuAnimationLink;
