import { DataTableSkeleton } from "@/components/_common/data-table-generic/data-table-skelete";
import { FormField } from "@/components/ui/form";
import { FilterEnum } from "@/types/filter-enum";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { GetQueryableQuery } from "@/types/queries/base/base-query";
import { BusinessResult } from "@/types/response/business-result";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z, ZodObject, ZodType } from "zod";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableComponent } from "./data-table-component";
import { UpdateCommand } from "@/types/commands/base/base-command";
import { Card } from "@/components/ui/card";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  fetchData: (
    queryParams: GetQueryableQuery
  ) => Promise<BusinessResult<QueryResult<TData>>>;
  deleteAll?: (id: string) => Promise<BusinessResult<null>>;
  restore?: (command: UpdateCommand) => Promise<BusinessResult<any>>;
  deletePermanent?: (id: string) => Promise<BusinessResult<null>>;
  columnSearch: string;
  filterEnums?: FilterEnum[];
  formSchema?: ZodObject<any>;
  formFilterAdvanceds?: FormFilterAdvanced[];
  defaultParams?: Record<string, any>;
  className?: string;
}

export function DataTable<TData>({
  columns,
  fetchData,
  filterEnums = [],
  deleteAll,
  restore,
  deletePermanent,
  columnSearch,
  formSchema,
  formFilterAdvanceds = [],
  defaultParams,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
  const queryClient = useQueryClient();

  useEffect(() => {
    if (defaultParams) {
      form.reset(defaultParams);
    }
  }, [defaultParams, queryClient]);

  const getDefaultParams = () => {
    if (formFilterAdvanceds.length == 0) {
      return defaultParams;
    }

    const generatedDefaultParams = formFilterAdvanceds.reduce(
      (
        acc: { [x: string]: any },
        field: { name: string | number; defaultValue: any }
      ) => {
        if ("defaultValue" in field) {
          acc[field.name] = field.defaultValue;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    return {
      ...generatedDefaultParams,
      ...defaultParams,
    };
  };

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

  const form = useForm<
    z.infer<
      typeof formSchema extends ZodType<any>
        ? typeof formSchema
        : typeof defaultSchema
    >
  >({
    resolver: zodResolver(formSchema ?? defaultSchema),
    defaultValues: getDefaultParams(),
  });

  const formValues = useWatch({
    control: form.control,
  });

  const getQueryParams = useCallback((): GetQueryableQuery => {
    const filterParams: Record<string, any> = {};

    columnFilters.forEach((filter) => {
      filterParams[filter.id] = filter.value;
    });

    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (
          Array.isArray(value) &&
          value.every((v) => typeof v === "boolean")
        ) {
          filterParams[key] = value;
        } else if (typeof value === "object" && value !== null) {
          filterParams[key] = JSON.stringify(value);
        } else {
          filterParams[key] = value;
        }
      }
    });

    return {
      pageNumber: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortField: sorting.length > 0 ? sorting[0]?.id : "CreatedDate",
      sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : -1,
      isPagination: true,
      fromDate: formValues?.date?.from?.toISOString() || undefined,
      toDate: formValues?.date?.to?.toISOString() || undefined,
      ...filterParams,
    };
  }, [pagination, sorting, formValues, columnFilters]);

  const queryParams = useMemo(() => getQueryParams(), [getQueryParams]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["data", queryParams],
    queryFn: () => fetchData(queryParams),
    placeholderData: keepPreviousData,
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  const handleFilterClick = () => {
    setIsSheetOpen(true);
    setShouldFetch(false);
  };

  const table = useReactTable({
    data: data?.data?.results ?? [],
    columns,
    rowCount: data?.data?.totalRecords ?? 0,
    state: { pagination, sorting, columnFilters, columnVisibility },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSheetChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  };

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

  if (error) return <div>Error loading data</div>;

  return (
    <Card ref={scrollRef} className="space-y-4 p-4">
      <DataTableToolbar
        form={form}
        table={table}
        filterEnums={filterEnums}
        deleteAll={deleteAll}
        isSheetOpen={isSheetOpen}
        columnSearch={columnSearch}
        handleSheetChange={handleSheetChange}
        formFilterAdvanceds={formFilterAdvanceds}
      />
      {isFetching && !isTyping ? (
        <DataTableSkeleton
          columnCount={1}
          showViewOptions={false}
          rowCount={pagination.pageSize}
          searchableColumnCount={0}
          filterableColumnCount={0}
          withPagination={false}
          shrinkZero
        />
      ) : (
        <DataTableComponent
          className={className}
          deletePermanent={deletePermanent}
          restore={restore}
          table={table}
        />
      )}

      <DataTablePagination table={table} />
    </Card>
  );
}
