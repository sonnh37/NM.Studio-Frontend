import { cn } from "@/lib/utils"
import React from "react"
import "./style.css"

type MenuAnimationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

export function MenuAnimationButton({ className, children, ...props }: MenuAnimationButtonProps) {
  return (
    <button
      data-slot="menu-animation-button"
      className={cn(
        "menu__button rounded-sm border border-neutral-300 overflow-hidden",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}
