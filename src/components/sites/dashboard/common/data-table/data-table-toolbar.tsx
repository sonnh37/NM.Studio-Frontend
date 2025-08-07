"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { isDeleted_options } from "../filters";
import { DataTableFacetedFilter } from "@/components/sites/dashboard/common/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/sites/dashboard/common/data-table/data-table-view-options";

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("isDeleted") && (
          <DataTableFacetedFilter
            column={table.getColumn("isDeleted")}
            title="Status"
            options={isDeleted_options}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

// "use client";

// import type { Column, Table } from "@tanstack/react-table";
// import { X } from "lucide-react";
// import * as React from "react";

// import { DataTableDateFilter } from "@/components/sites/dashboard/common/data-table/data-table-date-filter";
// import { DataTableFacetedFilter } from "@/components/sites/dashboard/common/data-table/data-table-faceted-filter";
// import { DataTableSliderFilter } from "@/components/sites/dashboard/common/data-table/data-table-slider-filter";
// import { DataTableViewOptions } from "@/components/sites/dashboard/common/data-table/data-table-view-options";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

// interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
//   table: Table<TData>;
// }

// export function DataTableToolbar<TData>({
//   table,
//   children,
//   className,
//   ...props
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = table.getState().columnFilters.length > 0;

//   const columns = React.useMemo(
//     () => table.getAllColumns().filter((column) => column.getCanFilter()),
//     [table]
//   );

//   const onReset = React.useCallback(() => {
//     table.resetColumnFilters();
//   }, [table]);

//   return (
//     <div
//       role="toolbar"
//       aria-orientation="horizontal"
//       className={cn(
//         "flex w-full items-start justify-between gap-2 p-1",
//         className
//       )}
//       {...props}
//     >
//       <div className="flex flex-1 flex-wrap items-center gap-2">
//         {columns.map((column) => (
//           <DataTableToolbarFilter key={column.id} column={column} />
//         ))}
//         {isFiltered && (
//           <Button
//             aria-label="Reset filters"
//             variant="outline"
//             size="sm"
//             className="border-dashed"
//             onClick={onReset}
//           >
//             <X />
//             Reset
//           </Button>
//         )}
//       </div>
//       <div className="flex items-center gap-2">
//         {children}
//         <DataTableViewOptions table={table} />
//       </div>
//     </div>
//   );
// }
// interface DataTableToolbarFilterProps<TData> {
//   column: Column<TData>;
// }

// function DataTableToolbarFilter<TData>({
//   column,
// }: DataTableToolbarFilterProps<TData>) {
//   {
//     const columnMeta = column.columnDef.meta;

//     const onFilterRender = React.useCallback(() => {
//       if (!columnMeta?.variant) return null;

//       switch (columnMeta.variant) {
//         case "text":
//           return (
//             <Input
//               placeholder={columnMeta.placeholder ?? columnMeta.label}
//               value={(column.getFilterValue() as string) ?? ""}
//               onChange={(event) => column.setFilterValue(event.target.value)}
//               className="h-8 w-40 lg:w-56"
//             />
//           );

//         case "number":
//           return (
//             <div className="relative">
//               <Input
//                 type="number"
//                 inputMode="numeric"
//                 placeholder={columnMeta.placeholder ?? columnMeta.label}
//                 value={(column.getFilterValue() as string) ?? ""}
//                 onChange={(event) => column.setFilterValue(event.target.value)}
//                 className={cn("h-8 w-[120px]", columnMeta.unit && "pr-8")}
//               />
//               {columnMeta.unit && (
//                 <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
//                   {columnMeta.unit}
//                 </span>
//               )}
//             </div>
//           );

//         case "range":
//           return (
//             <DataTableSliderFilter
//               column={column}
//               title={columnMeta.label ?? column.id}
//             />
//           );

//         case "date":
//         case "dateRange":
//           return (
//             <DataTableDateFilter
//               column={column}
//               title={columnMeta.label ?? column.id}
//               multiple={columnMeta.variant === "dateRange"}
//             />
//           );

//         case "select":
//         case "multiSelect":
//           return (
//             <DataTableFacetedFilter
//               column={column}
//               title={columnMeta.label ?? column.id}
//               options={columnMeta.options ?? []}
//               multiple={columnMeta.variant === "multiSelect"}
//             />
//           );

//         default:
//           return null;
//       }
//     }, [column, columnMeta]);

//     return onFilterRender();
//   }
// }
