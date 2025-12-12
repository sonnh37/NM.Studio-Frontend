// import { columns } from "./columns";

// import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
// import { DataTableDownload } from "@/components/_common/data-table-generic/data-table-download";
// import { DataTableFilterSheet } from "@/components/_common/data-table-generic/data-table-filter-sheet";
// import { DataTableSortColumnsPopover } from "@/components/_common/data-table-generic/data-table-sort-column";
// import { DataTableToggleColumnsPopover } from "@/components/_common/data-table-generic/data-table-toggle-columns";
// import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
// import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
// import { isDeleted_options } from "@/components/_common/filters";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ChevronRight } from "lucide-react";
// import { TypographyH2 } from "@/components/_common/typography/typography-h2";
// import { TypographyH3 } from "@/components/_common/typography/typography-h3";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   FormDescription,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useQueryParams } from "@/hooks/use-query-params";
// import {
//   calculateStock,
//   cn,
//   getDefaultFormFilterValues,
//   getEnumLabel,
// } from "@/lib/utils";
// import { productService } from "@/services/product-service";
// import { ProductGetAllQuery } from "@/types/cqrs/queries/product-query";
// import { FilterEnum } from "@/types/filter-enum";
// import { FormFilterAdvanced } from "@/types/form-filter-advanced";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery } from "@tanstack/react-query";
// import {
//   ColumnFiltersState,
//   getCoreRowModel,
//   PaginationState,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";
// import { format } from "date-fns";
// import { CalendarIcon, SearchIcon } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import * as React from "react";
// import { useEffect, useMemo, useState } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import { z } from "zod";
// import { ProductPreview, ProductStatus } from "@/types/entities/product";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group";
// import { DataProductTableComponent } from "./data-table-component";
// import { Const } from "@/lib/constants/const";

// //#region INPUT
// const formFilterAdvanceds: FormFilterAdvanced[] = [
//   {
//     name: "date",
//     label: "Date",
//     defaultValue: {
//       from: undefined,
//       to: undefined,
//     },
//     render: ({ field }: { field: any }) => (
//       <FormItem className="flex flex-col">
//         <FormLabel>Date</FormLabel>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               id="date"
//               variant={"outline"}
//               className={cn(
//                 "w-full justify-start text-left font-normal",
//                 !field.value?.from && "text-muted-foreground"
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {field.value?.from ? (
//                 field.value?.to ? (
//                   <>
//                     {format(field.value.from, "LLL dd, y")} -{" "}
//                     {format(field.value.to, "LLL dd, y")}
//                   </>
//                 ) : (
//                   format(field.value.from, "LLL dd, y")
//                 )
//               ) : (
//                 <span>Pick a date</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               initialFocus
//               mode="range"
//               defaultMonth={field.value?.from}
//               selected={{
//                 from: field.value?.from!,
//                 to: field.value?.to,
//               }}
//               onSelect={field.onChange}
//               numberOfMonths={2}
//             />
//           </PopoverContent>
//         </Popover>
//         <FormDescription>
//           The date you want to add a comment for.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     ),
//   },
// ];

// const columnSearch = "sku";
// const query_key = "data";
// const filterEnums: FilterEnum[] = [
//   {
//     columnId: "isDeleted",
//     title: "Trạng thái xóa",
//     options: isDeleted_options,
//   },
// ];

// const defaultSchema = z.object({
//   id: z.string().nullable().optional(),
//   date: z
//     .object({
//       from: z.date().optional(),
//       to: z.date().optional(),
//     })
//     .refine((date) => !!date.to, { message: "End Date is required." })
//     .optional(),
//   isDeleted: z.boolean().nullable().optional(),
// });
// //#endregion
// export default function ProductTable() {
//   const searchParams = useSearchParams();
//   const queryParam = searchParams.get("q");
//   const pathname = usePathname();
//   const [sorting, setSorting] = React.useState<SortingState>([
//     {
//       id: "createdDate",
//       desc: true,
//     },
//   ]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [pagination, setPagination] = React.useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const [shouldFetch, setShouldFetch] = useState(true);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const form = useForm<z.infer<typeof defaultSchema>>({
//     resolver: zodResolver(defaultSchema),
//     defaultValues: getDefaultFormFilterValues(formFilterAdvanceds),
//   });

//   const formValues = useWatch({
//     control: form.control,
//   });

//   const queryParams = useMemo(() => {
//     const params: ProductGetAllQuery = useQueryParams(
//       formValues,
//       columnFilters,
//       pagination,
//       sorting
//     );

//     params.includeProperties = ["category", "subCategory", "thumbnail"];

//     return { ...params };
//   }, [formValues, columnFilters, pagination, sorting]);

//   const { data, isFetching, error } = useQuery({
//     queryKey: [query_key, queryParams],
//     queryFn: () => productService.getAllPreview(queryParams),
//     enabled: shouldFetch,
//     refetchOnWindowFocus: false,
//   });

//   if (error) return <div>Error loading data</div>;

//   const table = useReactTable({
//     data: data?.data?.results ?? [],
//     columns,
//     pageCount: data?.data?.pageCount ?? -1,
//     rowCount: data?.data?.totalItemCount ?? 0,
//     state: { pagination, sorting, columnFilters, columnVisibility },
//     initialState: {
//       columnPinning: { right: ["actions"] },
//     },
//     onPaginationChange: setPagination,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//     getRowId: (originalRow) => originalRow.id,
//   });

//   //#region useEffect
//   useEffect(() => {
//     if (columnFilters.length > 0 || formValues) {
//       setPagination((prev) => ({
//         ...prev,
//         pageIndex: 0,
//       }));
//     }
//   }, [columnFilters, formValues]);

//   useEffect(() => {
//     const field = formValues[columnSearch as keyof typeof formValues] as
//       | string
//       | undefined;
//     if (field && field.length > 0) {
//       setIsTyping(true);
//     } else {
//       setIsTyping(false);
//     }
//   }, [formValues[columnSearch as keyof typeof formValues]]);
//   //#endregion

//   const handleSheetChange = (open: boolean) => {
//     setIsSheetOpen(open);
//     if (open) {
//       setShouldFetch(false);
//     } else {
//       setShouldFetch(true);
//     }
//   };

// const tabs = [
//   {
//     name: "All",
//     value: "all",
//     content: (
//       <>
//         Discover{" "}
//         <span className="text-foreground font-semibold">fresh ideas</span>,
//         trending topics, and hidden gems curated just for you. Start exploring
//         and let your curiosity lead the way!
//       </>
//     ),
//   },
//   {
//     name: getEnumLabel(ProductStatus, ProductStatus.Active),
//     value: getEnumLabel(ProductStatus, ProductStatus.Active),
//     content: (
//       <>
//         All your{" "}
//         <span className="text-foreground font-semibold">favorites</span> are
//         saved here. Revisit articles, collections, and moments you love, any
//         time you want a little inspiration.
//       </>
//     ),
//   },
//   {
//     name: getEnumLabel(ProductStatus, ProductStatus.Archived),
//     value: getEnumLabel(ProductStatus, ProductStatus.Archived),
//     content: (
//       <>
//         <span className="text-foreground font-semibold">Surprise!</span>{" "}
//         Here&apos;s something unexpected—a fun fact, a quirky tip, or a daily
//         challenge. Come back for a new surprise every day!
//       </>
//     ),
//   },
//   {
//     name: getEnumLabel(ProductStatus, ProductStatus.Draft),
//     value: getEnumLabel(ProductStatus, ProductStatus.Draft),
//     content: (
//       <>
//         <span className="text-foreground font-semibold">Surprise!</span>{" "}
//         Here&apos;s something unexpected—a fun fact, a quirky tip, or a daily
//         challenge. Come back for a new surprise every day!
//       </>
//     ),
//   },
// ];

//   return (
//     <>
//       <div className="flex items-center justify-between pb-4">
//         <div>
//           <TypographyH3>Products</TypographyH3>
//         </div>

//         <div>
//           <Button>+ Add Product</Button>
//         </div>
//       </div>

//       {/* Status */}
//       <div className="w-full">
//         <Tabs defaultValue="explore" className="gap-4">
//           <TabsList className="bg-background rounded-none border-b p-0 w-full inline-block">
//             {tabs.map((tab) => (
//               <TabsTrigger
//                 key={tab.value}
//                 value={tab.value}
//                 className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
//               >
//                 {tab.name}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {tabs.map((tab) => (
//             <TabsContent key={tab.value} value={tab.value}>
//               <p className="text-muted-foreground text-sm">{tab.content}</p>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>

//       {/* Toolbar */}
//       {/* <div className="flex gap-3">
//         <InputGroup className="w-fit">
//           <InputGroupInput placeholder="Search..." />
//           <InputGroupAddon>
//             <SearchIcon />
//           </InputGroupAddon>
//         </InputGroup>
//         <Select>
//           <SelectTrigger className="w-fit">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Fruits</SelectLabel>
//               <SelectItem value="apple">Apple</SelectItem>
//               <SelectItem value="banana">Banana</SelectItem>
//               <SelectItem value="blueberry">Blueberry</SelectItem>
//               <SelectItem value="grapes">Grapes</SelectItem>
//               <SelectItem value="pineapple">Pineapple</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className="w-fit">
//             <SelectValue placeholder="Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Fruits</SelectLabel>
//               <SelectItem value="apple">Apple</SelectItem>
//               <SelectItem value="banana">Banana</SelectItem>
//               <SelectItem value="blueberry">Blueberry</SelectItem>
//               <SelectItem value="grapes">Grapes</SelectItem>
//               <SelectItem value="pineapple">Pineapple</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div> */}
//       {/* Data */}
//       <DataProductTableComponent
//         isLoading={isFetching}
//         deletePermanentFunc={(command) => productService.delete(command)}
//         updateUndoFunc={(command) => productService.update(command)}
//         table={table}
//         queryKey={query_key}
//       >
//         <DataTableToolbar
//           table={table}
//           filterEnums={filterEnums}
//           columnSearch={columnSearch}
//         >
//           <DeleteBaseEntitysDialog
//             list={table
//               .getFilteredSelectedRowModel()
//               .rows.map((row) => row.original)}
//             query_keys={[query_key]}
//             deleteFunc={(command) => productService.delete(command)}
//             onSuccess={() => table.toggleAllRowsSelected(false)}
//           />
//           <DataTableFilterSheet
//             form={form}
//             isSheetOpen={isSheetOpen}
//             handleSheetChange={handleSheetChange}
//             formFilterAdvanceds={formFilterAdvanceds}
//           />
//           <DataTableSortColumnsPopover table={table} />
//
//           <DataTableDownload table={table} />

//           <Link
//             className="text-primary-foreground sm:whitespace-nowrap"
//             href={`${pathname}/new`}
//           >
//             <Button size={"sm"}>Add</Button>
//           </Link>
//         </DataTableToolbar>
//       </DataProductTableComponent>
//     </>
//   );
// }

// type ProductCardProps = {
//   product: ProductPreview;
// };

// export function ProductCard({ product }: ProductCardProps) {
//   const { stock, stockLevel } = calculateStock(
//     product.totalStockDefaultQuantity,
//     product.totalStockQuantity
//   );

//   const status = getProductStatusDisplay(product.status);
//   return (
//     <Card className="rounded-xl shadow-sm hover:shadow-md transition">
//       <CardContent className="p-4 flex gap-4">
//         <img
//           src={product.thumbnail?.mediaUrl ?? Const.IMAGE_DEFAULT_URL}
//           alt={product.name}
//           className="w-20 h-20 rounded-lg object-cover"
//         />

//         <div className="flex-1 flex flex-col gap-2">
//           <div className="flex items-start justify-between">
//             <Link href={`products/${product.id}`} className="hover:underline">
//               <TypographyH2>{product.name}</TypographyH2>
//             </Link>
//             <Badge
//               variant={status.variant}
//               className={cn("text-xs", status.className)}
//             >
//               {status.label}
//             </Badge>
//           </div>

//           <p className="text-xs text-neutral-500">SKU {product.sku}</p>

//           <div className="grid grid-cols-2 gap-3 text-sm mt-1">
//             <div>
//               <p className="text-neutral-400 text-xs">Retail</p>
//               <p className="font-semibold">
//                 ${product.minPrice}–${product.maxPrice}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-2 text-sm">
//             <div className="flex items-center gap-2">
//               <Badge
//                 className={cn(
//                   "px-3 py-1 text-xs rounded-md",
//                   stockLevel === "High" && "bg-green-100 text-green-700",
//                   stockLevel === "Medium" && "bg-yellow-100 text-yellow-700",
//                   stockLevel === "Low" && "bg-red-100 text-red-700"
//                 )}
//               >
//                 {stock} stock – {stockLevel}
//               </Badge>
//             </div>

//             <div className="text-neutral-600 text-xs flex items-center gap-1">
//               Variants ({product.variants.length}) <ChevronRight size={16} />
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export function getProductStatusDisplay(status: ProductStatus) {
//   switch (status) {
//     case ProductStatus.Active:
//       return {
//         label: "Active",
//         className: "bg-green-100 text-green-700 hover:bg-green-200",
//         variant: "default" as const,
//       };

//     case ProductStatus.Draft:
//       return {
//         label: "Draft",
//         className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
//         variant: "secondary" as const,
//       };

//     case ProductStatus.Archived:
//       return {
//         label: "Archived",
//         className: "bg-gray-200 text-gray-700 hover:bg-gray-300",
//         variant: "outline" as const,
//       };

//     default:
//       return {
//         label: "Unknown",
//         className: "bg-neutral-200 text-neutral-700",
//         variant: "secondary" as const,
//       };
//   }
// }

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product-service";
import { ProductPreview, ProductStatus } from "@/types/entities/product";
import { DataTablePagination } from "@/components/_common/data-table-generic/data-table-pagination";
import { toast } from "sonner";
import { ProductGetAllQuery } from "@/types/cqrs/queries/product-query";
import { DataCustomPagination } from "@/components/_common/data-custom/data-custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { getEnumLabel } from "@/lib/utils/enum-utils";

import { calculateStock, cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Ellipsis, Eye, MoreHorizontal, Pen } from "lucide-react";
import { Constants } from "@/lib/constants/constants";
import Link from "next/link";
import { TypographyH2 } from "@/components/_common/typography/typography-h2";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { usePathname, useRouter } from "next/navigation";
import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { ProductCard } from "./product-card";
import { Status } from "@/types/models/business-result";

export default function ProductTableNoReactTable() {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // statusFilter: null => backend hiểu là "tất cả"
  const [statusFilter, setStatusFilter] = useState<ProductStatus | null>(null);
  // selectedTabIndex: 0 = All, 1..n = các status khác
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const tabs: { name: string; status: ProductStatus | null }[] = [
    { name: "All Products", status: null },
    {
      name: getEnumLabel(ProductStatus, ProductStatus.Active),
      status: ProductStatus.Active,
    },
    {
      name: getEnumLabel(ProductStatus, ProductStatus.Archived),
      status: ProductStatus.Archived,
    },
    {
      name: getEnumLabel(ProductStatus, ProductStatus.Draft),
      status: ProductStatus.Draft,
    },
  ];

  const queryParams: ProductGetAllQuery = useMemo(
    () => ({
      pagination: {
        isPagingEnabled: true,
        pageSize,
        pageNumber: pageIndex,
      },
      includeProperties: ["category", "subCategory", "thumbnail"],
      // null => không gửi field, backend tự hiểu là "tất cả"
      status: statusFilter ?? undefined,
    }),
    [pageIndex, pageSize, statusFilter]
  );

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productService.getAllPreview(queryParams),
    refetchOnWindowFocus: false,
  });

  if (error) {
    toast.error("Failed to fetch products");
    console.error(error);
  }

  const handleTabChange = (tabValue: string) => {
    const index = Number(tabValue);
    setSelectedTabIndex(index);
    setPageIndex(1);
    const tab = tabs[index];
    setStatusFilter(tab?.status ?? null);
  };

  const products = data?.data?.results || [];
  const totalItems = data?.data?.totalItemCount || 0;

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between">
        <TypographyH3>Products ({totalItems})</TypographyH3>
        <Button className="" onClick={() => router.push("products/new")}>
          + Add Product
        </Button>
      </div>

      {/* Status */}
      <div className="w-full">
        <Tabs
          value={selectedTabIndex.toString()}
          onValueChange={handleTabChange}
          className="gap-4"
        >
          <TabsList className="bg-background rounded-none p-0 w-full">
            <div className="flex justify-between w-full">
              <div className="bg-background rounded-none border-b p-0 w-full inline-block">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={index}
                    value={index.toString()}
                    className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
              {/* <div>
                <Button>Create</Button>
              </div> */}
            </div>
          </TabsList>

          {tabs.map((tab, index) => (
            <TabsContent key={index} value={index.toString()}>
              <p className="text-muted-foreground text-sm">{tab.name}</p>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
        {isFetching ? (
          <SkeletonCard count={6} />
        ) : products.length > 0 ? (
          products.map((product: ProductPreview) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <div className="text-center col-span-full h-24 flex items-center justify-center">
            Không có kết quả.
          </div>
        )}
      </div>

      {data?.data && (
        <DataCustomPagination
          queryResult={data.data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      )}
    </div>
  );
}

export function SkeletonCard({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-xl border p-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
