"use client";


import { cn } from "@/lib/utils";
import React from "react";

interface TitleProviderProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const TitleProvider: React.FC<TitleProviderProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div>
      <div className="py-8 space-y-2">
        <h2
          className={cn(
            "text-3xl uppercase container mx-auto tracking-wide text-neutral-800",
            className
          )}
        >
          {title}
        </h2>
        <p className="text-center tracking-widest text-xs uppercase font-thin text-neutral-600 dark:text-neutral-200">
          Nhu my studio
        </p>
      </div>
      {children}
    </div>
  );
};
