"use client";

import { Button } from "@/components/ui/button";
import {
  updateLocalCache,
  updateUserCache,
} from "@/lib/redux/slices/cacheSlice";
import { AppDispatch } from "@/lib/redux/store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const dispatch = useDispatch<AppDispatch>();
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = useCallback(
    (e?: React.MouseEvent) => {
      const newMode = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(newMode);
      dispatch(updateLocalCache({ theme: newMode }));
      dispatch(updateUserCache({ theme: newMode }));
    },
    [resolvedTheme, setTheme, dispatch]
  );

  const isDarkMode = resolvedTheme === "dark";

  return (
    <button
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
      className={cn(
        "relative h-8 w-14 rounded-full p-1", // Điều chỉnh kích thước
        "border border-border/50",
        "bg-gradient-to-r from-gray-100 to-gray-200",
        "dark:from-gray-800 dark:to-gray-900",
        "transition-all duration-300 ease-in-out",
        "group overflow-hidden",
        "shadow-sm hover:shadow",
        "focus:outline-none focus:ring-2 focus:ring-primary/30"
      )}
    >
      {/* Toggle knob - Điều chỉnh để không bị lệch */}
      <div
        className={cn(
          "relative h-6 w-6 rounded-full", // Kích thước knob nhỏ hơn
          "bg-gradient-to-br from-amber-400 to-orange-500",
          "dark:from-indigo-400 dark:to-purple-500",
          "shadow-lg transition-all duration-300 ease-in-out",
          "flex items-center justify-center",
          "transform", // Đảm bảo có transform
          isDarkMode ? "translate-x-6" : "translate-x-0" // Điều chỉnh translate chính xác
        )}
      >
        {/* Sun icon */}
        <Sun
          className={cn(
            "absolute size-3.5 text-white transition-all duration-200",
            isDarkMode
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          )}
        />

        {/* Moon icon */}
        <Moon
          className={cn(
            "absolute size-3.5 text-white transition-all duration-200",
            isDarkMode
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          )}
        />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars for dark mode */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isDarkMode ? "opacity-100" : "opacity-0"
          )}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute size-0.5 rounded-full bg-white/80"
              style={{
                top: `${25 + i * 25}%`,
                left: `${20 + i * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Sun rays for light mode */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isDarkMode ? "opacity-0" : "opacity-100"
          )}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-1.5 bg-amber-400/60"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(10px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Track gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100/20 to-indigo-100/20 dark:from-amber-900/10 dark:to-indigo-900/10" />
    </button>
  );
}
