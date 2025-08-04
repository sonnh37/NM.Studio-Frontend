"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DeleteCommand,
  UpdateCommand,
} from "@/types/commands/base/base-command";
import { BusinessResult } from "@/types/response/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface TableComponentProps<TData> {
  table: ReactTable<TData>;
  isLoading?: boolean;
  className?: string;
  queryKey?: string;
  updateUndoFunc?: (command: any) => Promise<BusinessResult<any>>;
  deletePermanentFunc?: (command: any) => Promise<BusinessResult<null>>;
}

export function DataTableComponent<TData>({
  table,
  className,
  isLoading = false,

  updateUndoFunc,
  deletePermanentFunc,
  queryKey = "data",
}: TableComponentProps<TData>) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const columnsLength = table
    .getHeaderGroups()
    .flatMap((group) => group.headers).length;

  const tableWidth = useSelector(
    (state: any) => state.widths.selectedWidths[0] || 100
  );

  const handleRestore = async (model: any) => {
    if (updateUndoFunc) {
      try {
        const command: UpdateCommand = {
          ...model,
        };
        const result = await updateUndoFunc(command);
        if (result.status == 1) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          toast.success(`Row with id ${model.id} restored successfully.`);
          // Optionally, updateUndoFunc the local state or refetch data
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
        if (result.status == 1) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          toast.success(`Row with id ${id} deleted permanently.`);
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
        {isLoading ? (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-[300px]"
            >
              <div className="flex h-full items-center justify-center">
                <LoadingComponent />
              </div>
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => {
            const model = row.original as any;
            if (!model) {
              return;
            }
            const isDeleted = model.isDeleted;
            const id = model.id as string;
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                style={{
                  position: "relative",
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
                    className="p-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {isDeleted && (
                  <div className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center gap-1 bg-white/50 opacity-0 hover:opacity-100 dark:bg-black/50">
                    <Button type="button" onClick={() => handleRestore(model)}>
                      Restore
                    </Button>
                    <Button
                      type="button"
                      variant={"destructive"}
                      onClick={() => handleDeletePermanentFuncly(model.id)}
                    >
                      Delete Permanently
                    </Button>
                  </div>
                )}

                {id.toLocaleLowerCase() == q?.toLocaleLowerCase() && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-1 bg-neutral-500 opacity-50 dark:bg-black/50"></div>
                )}
              </TableRow>
            );
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
      </TableBody>
    </Table>
  );
}
