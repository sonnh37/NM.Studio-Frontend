"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataOnlyTableToolbar } from "@/components/common/data-table-origin/data-only-table-toolbar";
import { DataOnlyTablePagination } from "@/components/common/data-table-origin/data-only-table-pagination";
import { DataOnlyTableViewOptions } from "@/components/common/data-table-origin/data-only-table-view-options";
import { Label } from "@/components/ui/label";
import { productXSizeService } from "@/services/product-x-size-service";
import {
  ProductXSizeCreateCommand,
  ProductXSizeUpdateCommand,
} from "@/types/commands/product-x-size-command";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Size } from "@/types/size";
import { SizeCreateCommand } from "@/types/commands/size-command";
import { sizeService } from "@/services/size-service";
import { useRef, useState } from "react";
import { storage } from "../../../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ButtonLoading } from "@/components/common/button-loading";
import { Switch } from "@/components/ui/switch";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, FormSwitch } from "@/lib/form-custom-shadcn";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  productId: string;
  data: TData[];
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required").nullable(),
  isActive: z.boolean().default(false),
});

export function DataTableSizesInProduct<TData>({
  columns,
  data,
  productId,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const updatedValues: SizeCreateCommand = {
        name: data.name,
      };
      console.log("check_output", data);
      sizeService.create(updatedValues).then((response) => {
        if (response.status === 1) {
          const sizeId = response.data?.id;
          if (sizeId) {
            const productXSize_: ProductXSizeCreateCommand = {
              sizeId: sizeId,
              productId,
              isActive: data.isActive,
            };
            productXSizeService.create(productXSize_).then((response) => {
              if (response.status === 1) {
                queryClient.invalidateQueries({
                  queryKey: ["productXSizes", productId],
                });

                toast.success(response.message);
              } else {
                toast.error(response.message);
              }
            });
          }
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-3 items-end">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormSwitch form={form} name="isActive" label="Is Active" />
              <FormInput form={form} name="name" label="Name" />
              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button variant={"ghost"} type="submit">
                  Add Size
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("href")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("href")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )} */}
        </div>
        <DataOnlyTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataOnlyTablePagination table={table} />
    </div>
  );
}
