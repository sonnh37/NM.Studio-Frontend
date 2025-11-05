'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { PlateLeaf } from '@udecode/plate/react';

export const KbdLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => (
    <PlateLeaf
      ref={ref}
      as="kbd"
      className={cn(
        className,
        'rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-sm shadow-[rgba(255,255,255,0.1)_0px_0.5px_0px_0px_inset,rgb(248,249,250)_0px_1px_5px_0px_inset,rgb(193,200,205)_0px_0px_0px_0.5px,rgb(193,200,205)_0px_2px_1px_-1px,rgb(193,200,205)_0px_1px_0px_0px] dark:shadow-[rgba(255,255,255,0.1)_0px_0.5px_0px_0px_inset,rgb(26,29,30)_0px_1px_5px_0px_inset,rgb(76,81,85)_0px_0px_0px_0.5px,rgb(76,81,85)_0px_2px_1px_-1px,rgb(76,81,85)_0px_1px_0px_0px]'
      )}
      {...props}
    >
      {children}
    </PlateLeaf>
  )
);
