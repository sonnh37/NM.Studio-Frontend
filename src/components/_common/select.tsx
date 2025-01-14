"use client";

import * as React from "react";
import {CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon,} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";

import {cn} from "@/lib/utils";

const SelectV2 = SelectPrimitive.Root;

const SelectV2Group = SelectPrimitive.Group;

const SelectV2Value = SelectPrimitive.Value;

const SelectV2Trigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({className, children, ...props}, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <CaretSortIcon className="h-4 w-4 opacity-50"/>
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
));
SelectV2Trigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectV2ScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({className, ...props}, ref) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronUpIcon/>
    </SelectPrimitive.ScrollUpButton>
));
SelectV2ScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectV2ScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({className, ...props}, ref) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronDownIcon/>
    </SelectPrimitive.ScrollDownButton>
));
SelectV2ScrollDownButton.displayName =
    SelectPrimitive.ScrollDownButton.displayName;

const SelectV2Content = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({className, children, position = "popper", ...props}, ref) => (
    // <SelectPrimitive.Portal>
    <SelectPrimitive.Content
        ref={ref}
        className={cn(
            "relative z-[1001] max-h-96 rounded-md border bg-popover text-popover-foreground shadow-md",
            position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
        )}
        position={position}
        {...props}
    >
        <SelectV2ScrollUpButton/>
        <SelectPrimitive.Viewport
            className={cn(
                "p-1 overflow-auto", // Đảm bảo cuộn được kích hoạt
                position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            )}
        >
            {children}
        </SelectPrimitive.Viewport>
        <SelectV2ScrollDownButton/>
    </SelectPrimitive.Content>
    // </SelectPrimitive.Portal>
));

SelectV2Content.displayName = SelectPrimitive.Content.displayName;

const SelectV2Label = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({className, ...props}, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn("px-2 py-1.5 text-sm font-semibold", className)}
        {...props}
    />
));
SelectV2Label.displayName = SelectPrimitive.Label.displayName;

const SelectV2Item = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({className, children, ...props}, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4"/>
      </SelectPrimitive.ItemIndicator>
    </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));
SelectV2Item.displayName = SelectPrimitive.Item.displayName;

const SelectV2Separator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({className, ...props}, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
));
SelectV2Separator.displayName = SelectPrimitive.Separator.displayName;

export {
    SelectV2,
    SelectV2Group,
    SelectV2Value,
    SelectV2Trigger,
    SelectV2Content,
    SelectV2Label,
    SelectV2Item,
    SelectV2Separator,
    SelectV2ScrollUpButton,
    SelectV2ScrollDownButton,
};