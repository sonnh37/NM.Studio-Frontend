"use client";

import * as React from "react";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { useSelector } from "react-redux";
import { UpdateCommand } from "@/types/commands/base-command";
import { BusinessResult } from "@/types/response/business-result";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface TableComponentProps<TData> {
  table: ReactTable<TData>;
  className?: string;
  update?: (command: UpdateCommand) => Promise<BusinessResult<any>>;
  deletePermanent?: (id: string) => Promise<BusinessResult<null>>;
}

export function DataTableComponent<TData>({
  table,
  className,
  update,
  deletePermanent,
}: TableComponentProps<TData>) {
  const queryClient = useQueryClient();
  const columnsLength = table
    .getHeaderGroups()
    .flatMap((group) => group.headers).length;

  const tableWidth = useSelector(
    (state: any) => state.widths.selectedWidths[0] || 100
  );

  const handleRestore = async (model: any) => {
    if (update) {
      try {
        const command: UpdateCommand = { id: model.id, isDeleted: false }; // Define your command structure
        const result = await update(command);
        if (result.status == 1) {
          queryClient.invalidateQueries({ queryKey: ["data"] });
          toast.success(`Row with id ${model.id} restored successfully.`);
          // Optionally, update the local state or refetch data
        } else {
          toast.error(`Failed to restore row with id ${model.id}:`);
        }
      } catch (error) {
        console.error(`Error restoring row with id ${model.id}:`, error);
      }
    }
  };

  const handleDeletePermanently = async (id: string) => {
    if (deletePermanent) {
      try {
        const result = await deletePermanent(id);
        if (result.status == 1) {
          queryClient.invalidateQueries({ queryKey: ["data"] });
          toast.success(`Row with id ${id} deleted permanently.`);
          // Optionally, update the local state or refetch data
        } else {
          toast.error(`Failed to delete row with id ${id}:`);
        }
      } catch (error) {
        console.error(`Error deleting row with id ${id}:`, error);
      }
    }
  };

  return (
    <div
      className={`rounded-md border ${className} space-y-8`}
      style={{
        overflowY: "auto",
        width: "100%",
      }}
    >
      <Table style={{ width: "100%" }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              style={{
                transform: `scale(${tableWidth / 100})`,
                transformOrigin: "left",
              }}
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const model = row.original as any;
              const isDeleted = model.isDeleted;
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  style={{
                    position: "relative",
                    transform: `scale(${tableWidth / 100})`,
                    transformOrigin: "left",
                    pointerEvents: isDeleted ? "none" : "auto",
                  }}
                  className={isDeleted ? "hover:opacity-100" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        opacity: isDeleted ? 0.5 : 1,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {isDeleted && (
                    <div
                      className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center gap-1 bg-white/50 opacity-0 hover:opacity-100 dark:bg-black/50"
                    >
                      <Button onClick={() => handleRestore(model)}>Restore</Button>
                      <Button variant={"destructive"} onClick={() => handleDeletePermanently(model.id)}>
                        Delete Permanently
                      </Button>
                    </div>
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
