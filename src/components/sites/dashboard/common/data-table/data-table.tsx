// import * as React from "react";
// import { useEffect, useRef } from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   PaginationState,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";

// import { keepPreviousData, useQuery } from "@tanstack/react-query";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { DataTablePagination } from "@/components/sites/dashboard/common/data-table/data-table-pagination";
// import { GetQueryableQuery } from "@/types/queries/base/base-query";
// import { DataTableToolbar } from "@/components/sites/dashboard/common/data-table/data-table-toolbar";
// import BarLoader from "@/components/_common/bar-loader";
// import { QueryResult } from "@/types/response/query-result";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   getAllFunc: (queryParams: GetQueryableQuery) => Promise<QueryResult<TData>>;
//   stringObject: string;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   getAllFunc,
//   stringObject,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [pagination, setPagination] = React.useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const isDeletedFilter = columnFilters.find(
//     (filter) => filter.id === "isDeleted"
//   );
//   const isDeleted = isDeletedFilter
//     ? (isDeletedFilter.value as boolean)
//     : undefined;

//   const [queryParams, setQueryParams] = React.useState<GetQueryableQuery>({
//     pageNumber: pagination.pageIndex + 1,
//     pageSize: pagination.pageSize,
//     sortField: sorting.length > 0 ? sorting[0]?.id : "CreatedDate",
//     sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : 1,
//     isPagination: true,
//   });

//   useEffect(() => {
//     const isDeletedFilter = columnFilters.find(
//       (filter) => filter.id === "isDeleted"
//     );
//     const isDeleted = isDeletedFilter
//       ? (isDeletedFilter.value as boolean)
//       : undefined;
//     setQueryParams({
//       pageNumber: pagination.pageIndex + 1,
//       pageSize: pagination.pageSize,
//       sortField: sorting.length > 0 ? sorting[0]?.id : "",
//       sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : 1,
//       isPagination: true,
//     });
//   }, [pagination, sorting, columnFilters]);

//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [pagination]);

//   const { data, isFetching, error } = useQuery({
//     queryKey: ["data", queryParams],
//     queryFn: () => getAllFunc(queryParams),
//     placeholderData: keepPreviousData,
//   });

//   const defaultData: TData[] = React.useMemo(() => [], []);

//   const table = useReactTable({
//     data: data?.results ?? defaultData,
//     columns,
//     rowCount: data?.totalCount ?? 0,
//     onPaginationChange: (newPagination) => setPagination(newPagination),
//     onSortingChange: (newSorting) => setSorting(newSorting),
//     getCoreRowModel: getCoreRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     manualPagination: true,
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     debugTable: true,
//     state: {
//       pagination,
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//   });

//   if (isFetching)
//     return (
//       <div>
//         <BarLoader />
//       </div>
//     );
//   if (error) return <div>Error loading data</div>;

//   return (
//     <div ref={scrollRef} className="space-y-4">
//       <DataTableToolbar stringObject={stringObject} table={table} />
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <DataTablePagination table={table} />
//     </div>
//   );
// }


import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCommonPinningStyles } from "@/lib/utils/data-table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "@/components/_common/data-table-generic/data-table-pagination";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getCommonPinningStyles({ column: header.column }),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
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
                    <TableCell
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
