import { cn } from "@/lib/utils"; // Tùy chỉnh nếu bạn có hàm `cn` cho classNames
import React from "react";
import "./style.css";

interface MenuAnimationButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}
const MenuAnimationButton = React.forwardRef<
  HTMLAnchorElement,
  MenuAnimationButtonProps
>(({ className, children }) => {
  return (
    <button
      className={cn(
        "menu__button rounded-sm border border-neutral-300 overflow-hidden",
        className
      )}
    >
      <span className="">{children}</span>
    </button>
  );
});

MenuAnimationButton.displayName = "MenuAnimationButton";

export default MenuAnimationButton;
