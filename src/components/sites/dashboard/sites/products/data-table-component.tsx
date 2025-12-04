"use client";

import { DataTablePagination } from "@/components/_common/data-table-generic/data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DeleteCommand,
  UpdateCommand,
} from "@/types/cqrs/commands/base/base-command";
import { ProductPreview, ProductStatus } from "@/types/entities/product";
import { BusinessResult, Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { Table as ReactTable } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { ProductCard } from "./index2";

// interface TableComponentProps<ProductPreview>
//   extends React.ComponentProps<"div"> {
//   table: ReactTable<ProductPreview>;
//   isLoading?: boolean;
//   className?: string;
//   queryKey?: string;
//   updateUndoFunc?: (command: any) => Promise<BusinessResult<any>>;
//   deletePermanentFunc?: (command: any) => Promise<BusinessResult<null>>;
// }

interface TableComponentProps extends React.ComponentProps<"div"> {
  table: ReactTable<ProductPreview>;
  isLoading?: boolean;
  className?: string;
  queryKey?: string;
  updateUndoFunc?: (command: any) => Promise<BusinessResult<any>>;
  deletePermanentFunc?: (command: any) => Promise<BusinessResult<null>>;
}

export function DataProductTableComponent({
  table,
  children,
  className,
  isLoading = false,
  updateUndoFunc,
  deletePermanentFunc,
  queryKey = "data",
  ...props
}: TableComponentProps) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const tableWidth = useSelector(
    (state: any) => state.widths.selectedWidths[0] || 100
  );

  const handleRestore = async (model: any) => {
    if (updateUndoFunc) {
      try {
        const command: UpdateCommand = {
          ...model,
          isDeleted: false,
        };
        const result = await updateUndoFunc(command);
        if (result.status == Status.OK) {
          queryClient.refetchQueries({ queryKey: [queryKey] });
          toast.success("Restored");
        } else {
          toast.error(`Failed to updateUndoFunc row with id ${model.id}:`);
        }
      } catch (error) {
        console.error(`Error restoring row with id ${model.id}:`, error);
      }
    }
  };

  const handleDeletePermanentFuncly = async (id: string) => {
    const model: DeleteCommand = {
      id: id,
      isPermanent: true,
    };
    if (deletePermanentFunc) {
      try {
        const result = await deletePermanentFunc(model);
        if (result.status == Status.OK) {
          queryClient.refetchQueries({ queryKey: [queryKey] });
          toast.success(`Deleted`);
          // Optionally, updateUndoFunc the local state or refetch data
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
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
        {isLoading ? (
          <SkeletonCard count={table.getRowModel().rows.length || 6} />
        ) : table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => {
            return <ProductCard row={row} key={row.id} />;
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              Không có kết quả.
            </TableCell>
          </TableRow>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
