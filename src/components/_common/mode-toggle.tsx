"use client";

import { Button } from "@/components/ui/button";
import {
  updateLocalCache,
  updateUserCache
} from "@/lib/redux/slices/cacheSlice";
import { AppDispatch } from "@/lib/redux/store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function ModeToggle() {
  const dispatch = useDispatch<AppDispatch>();
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = useCallback(
    (e?: React.MouseEvent) => {
      const newMode = resolvedTheme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newMode);
        dispatch(updateLocalCache({ theme: newMode }));
        dispatch(updateUserCache({ theme: newMode }));
        return;
      }

      if (e) {
        root.style.setProperty("--x", `${e.clientX}px`);
        root.style.setProperty("--y", `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(newMode);
        dispatch(updateLocalCache({ theme: newMode }));
        dispatch(updateUserCache({ theme: newMode }));
      });
    },
    [resolvedTheme, setTheme, dispatch]
  );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
        <Sun
          className={`absolute size-[1.2rem] transition-all duration-300 ease-in-out ${
            resolvedTheme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute size-[1.2rem] transition-all duration-300 ease-in-out ${
            resolvedTheme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}