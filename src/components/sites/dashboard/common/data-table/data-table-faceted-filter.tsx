// import * as React from "react"
// import {Column} from "@tanstack/react-table"

// import {cn} from "@/lib/utils"
// import {Badge} from "@/components/ui/badge"
// import {Button} from "@/components/ui/button"
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
//     CommandSeparator,
// } from "@/components/ui/command"
// import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
// import {Separator} from "@/components/ui/separator"
// import {CheckIcon, PlusCircle} from "lucide-react"

// export type FilterOption = {
//     label: string
//     value: string
//     icon?: React.ComponentType<{ className?: string }>
// }

// interface DataTableFacetedFilter<TData, TValue> {
//     column?: Column<TData, TValue>
//     title?: string
//     options: FilterOption[]
// }

// export function DataTableFacetedFilter<TData, TValue>({
//                                                           column,
//                                                           title,
//                                                           options,
//                                                       }: DataTableFacetedFilter<TData, TValue>) {
//     const facets = column?.getFacetedUniqueValues()
//     const selectedValues = new Set(column?.getFilterValue() as string[])

//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button variant="outline" size="sm" className="h-8 border-dashed">
//                     <PlusCircle className="mr-2 h-4 w-4"/>
//                     {title}
//                     {selectedValues?.size > 0 && (
//                         <>
//                             <Separator orientation="vertical" className="mx-2 h-4"/>
//                             <Badge
//                                 variant="secondary"
//                                 className="rounded-sm px-1 font-normal lg:hidden"
//                             >
//                                 {selectedValues.size}
//                             </Badge>
//                             <div className="hidden space-x-1 lg:flex">
//                                 {selectedValues.size > 2 ? (
//                                     <Badge
//                                         variant="secondary"
//                                         className="rounded-sm px-1 font-normal"
//                                     >
//                                         {selectedValues.size} selected
//                                     </Badge>
//                                 ) : (
//                                     options
//                                         .filter((option) => selectedValues.has(option.value))
//                                         .map((option) => (
//                                             <Badge
//                                                 variant="secondary"
//                                                 key={option.value}
//                                                 className="rounded-sm px-1 font-normal"
//                                             >
//                                                 {option.label}
//                                             </Badge>
//                                         ))
//                                 )}
//                             </div>
//                         </>
//                     )}
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-[200px] p-0" align="start">
//                 <Command>
//                     <CommandInput placeholder={title}/>
//                     <CommandList>
//                         <CommandEmpty>No results found.</CommandEmpty>
//                         <CommandGroup>
//                             {options.map((option) => {
//                                 const isSelected = selectedValues.has(option.value)
//                                 return (
//                                     <CommandItem
//                                         key={option.value}
//                                         onSelect={() => {
//                                             if (isSelected) {
//                                                 selectedValues.delete(option.value)
//                                             } else {
//                                                 selectedValues.add(option.value)
//                                             }
//                                             const filterValues = Array.from(selectedValues)
//                                             column?.setFilterValue(
//                                                 filterValues.length ? filterValues : undefined
//                                             )
//                                         }}
//                                     >
//                                         <div
//                                             className={cn(
//                                                 "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
//                                                 isSelected
//                                                     ? "bg-primary text-primary-foreground"
//                                                     : "opacity-50 [&_svg]:invisible"
//                                             )}
//                                         >
//                                             <CheckIcon className={cn("h-4 w-4")}/>
//                                         </div>
//                                         {option.icon && (
//                                             <option.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
//                                         )}
//                                         <span>{option.label}</span>
//                                         {facets?.get(option.value) && (
//                                             <span
//                                                 className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
//                         {facets.get(option.value)}
//                       </span>
//                                         )}
//                                     </CommandItem>
//                                 )
//                             })}
//                         </CommandGroup>
//                         {selectedValues.size > 0 && (
//                             <>
//                                 <CommandSeparator/>
//                                 <CommandGroup>
//                                     <CommandItem
//                                         onSelect={() => column?.setFilterValue(undefined)}
//                                         className="justify-center text-center"
//                                     >
//                                         Clear filters
//                                     </CommandItem>
//                                 </CommandGroup>
//                             </>
//                         )}
//                     </CommandList>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     )
// }


"use client";

import type { Column } from "@tanstack/react-table";
import { Check, PlusCircle, XCircle } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Option } from "@/types/data-table";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  multiple,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = new Set(
    Array.isArray(columnFilterValue) ? columnFilterValue : [],
  );

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      if (!column) return;

      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues],
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
    },
    [column],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          {selectedValues?.size > 0 ? (
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <XCircle />
            </div>
          ) : (
            <PlusCircle />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden items-center gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="max-h-full">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onItemSelect(option, isSelected)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check />
                    </div>
                    {option.icon && <option.icon />}
                    <span className="truncate">{option.label}</span>
                    {option.count && (
                      <span className="ml-auto font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onReset()}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
