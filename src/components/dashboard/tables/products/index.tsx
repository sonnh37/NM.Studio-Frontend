import {columns} from "./columns";
import {fetchProducts} from "@/services/product-service";
import * as React from "react";
import {useEffect, useRef} from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {BaseQueryableQuery} from "@/types/queries/base-query";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import BarLoader from "@/components/common/bar-loader";
import {DataTableToolbar} from "@/components/dashboard/data-table/data-table-toolbar";
import {TableComponent} from "@/components/dashboard/data-table/table-component";
import {DataTablePagination} from "@/components/dashboard/data-table/data-table-pagination";

export default function DataTableProducts() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [pagination, setPagination] = React.useState<PaginationState>({pageIndex: 0, pageSize: 10});

    // Hàm để cập nhật queryParams
    const getQueryParams = React.useCallback((): BaseQueryableQuery => {
        return {
            pageNumber: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            sortField: sorting.length > 0 ? sorting[0]?.id : 'CreatedDate',
            sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : 1,
            isPagination: true,
        };
    }, [pagination, sorting, columnFilters]);

    const {data, isFetching, error} = useQuery({
        queryKey: ['data', getQueryParams()],
        queryFn: () => fetchProducts(getQueryParams()),
        placeholderData: keepPreviousData,
    });

    const table = useReactTable({
        data: data?.results ?? [],
        columns,
        rowCount: data?.totalRecords ?? 0,
        state: {pagination, sorting, columnFilters, columnVisibility},
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

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [pagination]);

    if (isFetching) return <div><BarLoader/></div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div ref={scrollRef} className="space-y-4">
            <DataTableToolbar stringObject="Product" table={table}/>
            <TableComponent table={table}/>
            <DataTablePagination table={table}/>
        </div>
    )
}
