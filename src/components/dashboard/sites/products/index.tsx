import { columns } from "./columns";

import { isDeleted_options } from "@/components/_common/filters";

import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import { DataTablePagination } from "@/components/_common/data-table-generic/data-table-pagination";
import { DataTableSkeleton } from "@/components/_common/data-table-generic/data-table-skelete";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import DataTablePhotos from "@/components/dashboard/sites/products/photos";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productService } from "@/services/product-service";
import { productXColorService } from "@/services/product-x-color-service";
import { productXSizeService } from "@/services/product-x-size-service";
import { FilterEnum } from "@/types/filter-enum";
import { ProductXColorGetAllQuery } from "@/types/queries/product-x-color-query";
import { ProductXSizeGetAllQuery } from "@/types/queries/product-x-size-query";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import DataTableColors from "./colors";
import DataTableSizes from "./sizes";

import { useQueryParams } from "@/hooks/use-query-params";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData } from "@tanstack/react-query";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  {
    name: "name",
    label: "Name",
    defaultValue: "",
    render: ({ field }: { field: any }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Product name..." {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
  },
];

const columnSearch = "name";
const filterEnums: FilterEnum[] = [
  { columnId: "isDeleted", title: "Is deleted", options: isDeleted_options },
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

export default function DataTableProducts() {
  const filterEnums: FilterEnum[] = [
    { columnId: "isDeleted", title: "Is deleted", options: isDeleted_options },
  ];

  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");

  // Fetch product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", queryParam?.toLowerCase()],
    queryFn: async () => {
      const response = await productService.fetchById(queryParam as string);
      return response.data;
    },
    enabled: !!queryParam,
    refetchOnWindowFocus: false
  });

  //#region DEFAULT
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
  //#endregion

  //#region CREATE TABLE
  const form = useForm<z.infer<typeof defaultSchema>>({
    resolver: zodResolver(defaultSchema),
    defaultValues: {},
  });

  const formValues = useWatch({
    control: form.control,
  });

  const getQueryParams = useQueryParams(
    formValues,
    columnFilters,
    pagination,
    sorting
  );

  const queryParams = useMemo(() => getQueryParams(), [getQueryParams]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["data", queryParams],
    queryFn: () => productService.fetchAll(queryParams),
    placeholderData: keepPreviousData,
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

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

  //#endregion

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
    <Tabs defaultValue="item-1">
      <TabsList>
        <TabsTrigger value="item-1">Products</TabsTrigger>
        <TabsTrigger value="item-2">Features</TabsTrigger>
      </TabsList>
      <TabsContent value="item-1">
        <Card className="space-y-4 p-4">
          <DataTableToolbar
            form={form}
            table={table}
            filterEnums={filterEnums}
            columnSearch={columnSearch}
            deleteAll={productService.delete}
            isSheetOpen={isSheetOpen}
            handleSheetChange={handleSheetChange}
            formFilterAdvanceds={formFilterAdvanceds}
          />

          {isFetching && !isTyping ? (
            <DataTableSkeleton
              columnCount={1}
              showViewOptions={false}
              withPagination={false}
              rowCount={pagination.pageSize}
              searchableColumnCount={0}
              filterableColumnCount={0}
              shrinkZero
            />
          ) : (
            <DataTableComponent
              deletePermanent={productService.deletePermanent}
              restore={productService.restore}
              table={table}
            />
          )}
          <DataTablePagination table={table} />
        </Card>
      </TabsContent>
      <TabsContent value="item-2">
        {isLoading || !product ? (
          <></>
        ) : (
          <>
            {/* Tab cho productXPhotos */}
            <Tabs defaultValue="photos-selected" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photos-selected">
                  Selected Photos
                </TabsTrigger>
                <TabsTrigger value="photos-available">
                  Available Photos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photos-selected">
                <Card className="p-4">
                  <DataTablePhotos
                    productId={product.id}
                    productXPhotos={product.productXPhotos ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="photos-available">
                <Card className="p-4">
                  <DataTablePhotos
                    productId={product.id}
                    productXPhotos={product.productXPhotos ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tab cho productXSizes */}
            <Tabs defaultValue="sizes-selected" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sizes-selected">Selected Sizes</TabsTrigger>
                <TabsTrigger value="sizes-available">
                  Available Sizes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sizes-selected">
                <Card className="p-4">
                  <DataTableSizes
                    productId={product.id}
                    productXSizes={product.productXSizes ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="sizes-available">
                <Card className="p-4">
                  <DataTableSizes
                    productId={product.id}
                    productXSizes={product.productXSizes ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tab cho productXColors */}
            <Tabs defaultValue="colors-selected" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="colors-selected">
                  Selected Colors
                </TabsTrigger>
                <TabsTrigger value="colors-available">
                  Available Colors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors-selected">
                <Card className="p-4">
                  <DataTableColors
                    productId={product.id}
                    productXColors={product.productXColors ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="colors-available">
                <Card className="p-4">
                  <DataTableColors
                    productId={product.id}
                    productXColors={product.productXColors ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
