import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { IoCheckboxSharp } from "react-icons/io5";
import { GrCheckbox } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}

export function DataTableToggleColumnsPopover<TData>({ table }: Props<TData>) {
  const initialColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  const [columnOrder, setColumnOrder] = useState(
    initialColumns.map((col) => col.id)
  );
  const [isToggleColumn, setIsToggleColumn] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState(
    initialColumns.reduce(
      (acc, col) => {
        acc[col.id] = col.getIsVisible();
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  // Update table column order and visibility
  useEffect(() => {
    table.setColumnOrder(columnOrder);
    Object.entries(columnVisibility).forEach(([id, isVisible]) => {
      const column = table.getColumn(id);
      if (column) {
        column.toggleVisibility(isVisible);
      }
    });
  }, [columnOrder, columnVisibility, table]);

  const toggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };
  return (
    <Popover open={isToggleColumn} onOpenChange={setIsToggleColumn}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          onClick={() => setIsToggleColumn(!isToggleColumn)}
        >
          <MixerHorizontalIcon className="h-4 w-4" />
          Select columns
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-fit p-2 shadow-lg rounded-md border bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-medium mb-2">Toggle columns</div>
        <div className="border-t my-2"></div>
        {columnOrder.map((columnId) => {
          const column = table.getColumn(columnId);
          return (
            <div
              key={column!.id}
              className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={() => toggleColumnVisibility(column!.id)}
            >
              <span className="">
                {columnVisibility[column!.id] ? (
                  <IoCheckboxSharp className="w-6 h-6 text-black" />
                ) : (
                  <GrCheckbox className="w-6 h-6 text-gray-500" />
                )}
              </span>
              <span className="capitalize">{column!.id}</span>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
