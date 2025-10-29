import { columns } from "./columns";

import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import { DataTableDownload } from "@/components/_common/data-table-generic/data-table-download";
import { DataTableFilterSheet } from "@/components/_common/data-table-generic/data-table-filter-sheet";
import { DataTableSortColumnsPopover } from "@/components/_common/data-table-generic/data-table-sort-column";
import { DataTableToggleColumnsPopover } from "@/components/_common/data-table-generic/data-table-toggle-columns";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { isDeleted_options } from "@/components/_common/filters";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn, getDefaultFormFilterValues } from "@/lib/utils";
import { serviceBookingService } from "@/services/service-booking-service";
import { ServiceBookingGetAllQuery } from "@/types/cqrs/queries/service-booking-query";
import { FilterEnum } from "@/types/filter-enum";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

//#region INPUT
const formFilterAdvanceds: FormFilterAdvanced[] = [
  {
    name: "date",
    label: "Date",
    defaultValue: {
      from: undefined,
      to: undefined,
    },
    render: ({ field }: { field: any }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value?.from ? (
                field.value?.to ? (
                  <>
                    {format(field.value.from, "LLL dd, y")} -{" "}
                    {format(field.value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(field.value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={field.value?.from}
              selected={{
                from: field.value?.from!,
                to: field.value?.to,
              }}
              onSelect={field.onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          The date you want to add a comment for.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
  },
];

const columnSearch = "title";
const query_key = "data";
const filterEnums: FilterEnum[] = [
  {
    columnId: "isDeleted",
    title: "Deleted status",
    options: isDeleted_options,
  },
];

const defaultSchema = z.object({
  id: z.string().nullable().optional(),
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((date) => !!date.to, { message: "End Date is required." })
    .optional(),
  isDeleted: z.boolean().nullable().optional(),
});
//#endregion
export default function ServiceBookingTable() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const pathname = usePathname();
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createdDate",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const form = useForm<z.infer<typeof defaultSchema>>({
    resolver: zodResolver(defaultSchema),
    defaultValues: getDefaultFormFilterValues(formFilterAdvanceds),
  });

  const formValues = useWatch({
    control: form.control,
  });

  const queryParams = useMemo(() => {
    const params: ServiceBookingGetAllQuery = useQueryParams(
      formValues,
      columnFilters,
      pagination,
      sorting
    );

    params.includeProperties = ["user", "service"];

    return { ...params };
  }, [formValues, columnFilters, pagination, sorting]);

  const { data, isFetching, error } = useQuery({
    queryKey: [query_key, queryParams],
    queryFn: () => serviceBookingService.getAll(queryParams),
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

  const table = useReactTable({
    data: data?.data?.results ?? [],
    columns,
    pageCount: data?.data?.pageCount ?? -1,
    rowCount: data?.data?.totalItemCount ?? 0,
    state: { pagination, sorting, columnFilters, columnVisibility },
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId: (originalRow) => originalRow.id,
  });

  //#region useEffect
  useEffect(() => {
    if (columnFilters.length > 0 || formValues) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }
  }, [columnFilters, formValues]);

  useEffect(() => {
    const field = formValues[columnSearch as keyof typeof formValues] as
      | string
      | undefined;
    if (field && field.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [formValues[columnSearch as keyof typeof formValues]]);
  //#endregion

  const handleSheetChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  };

  return (
    <DataTableComponent
      isLoading={isFetching}
      deletePermanentFunc={(command) => serviceBookingService.delete(command)}
      updateUndoFunc={(command) => serviceBookingService.update(command)}
      table={table}
      queryKey={query_key}
    >
      <DataTableToolbar
        table={table}
        filterEnums={filterEnums}
        columnSearch={columnSearch}
      >
        <DeleteBaseEntitysDialog
          list={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          query_keys={[query_key]}
          deleteFunc={(command) => serviceBookingService.delete(command)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
        <DataTableFilterSheet
          form={form}
          isSheetOpen={isSheetOpen}
          handleSheetChange={handleSheetChange}
          formFilterAdvanceds={formFilterAdvanceds}
        />
        <DataTableSortColumnsPopover table={table} />
        <DataTableToggleColumnsPopover table={table} />
        <DataTableDownload table={table} />

        <Link
          className="text-primary-foreground sm:whitespace-nowrap"
          href={`${pathname}/new`}
        >
          <Button
            size={"sm"}
            
          >
            Add
          </Button>
        </Link>
      </DataTableToolbar>
    </DataTableComponent>
  );
}
