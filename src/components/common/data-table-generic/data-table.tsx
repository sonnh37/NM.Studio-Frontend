import {DataTableSkeleton} from "@/components/common/data-table-generic/data-table-skelete";
import {FormField} from "@/components/ui/form";
import {FilterEnum} from "@/types/filter-enum";
import {FormFilterAdvanced} from "@/types/form-filter-advanced";
import {BaseQueryableQuery} from "@/types/queries/base-query";
import {BusinessResult} from "@/types/response/business-result";
import {zodResolver} from "@hookform/resolvers/zod";
import {keepPreviousData, useQuery, useQueryClient,} from "@tanstack/react-query";
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
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import {z, ZodObject, ZodType} from "zod";
import {DataTableToolbar} from "./data-table-toolbar";
import {DataTableComponent} from "./data-table-component";
import {UpdateCommand} from "@/types/commands/base-command";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    fetchData: (
        queryParams: BaseQueryableQuery
    ) => Promise<BusinessResult<PagedResponse<TData>>>;
    deleteAll?: (id: string) => Promise<BusinessResult<null>>;
    restore?: (command: UpdateCommand) => Promise<BusinessResult<any>>;
    deletePermanent?: (id: string) => Promise<BusinessResult<null>>;
    columnSearch: string;
    filterEnums?: FilterEnum[];
    formSchema?: ZodObject<any>;
    formFilterAdvanceds?: FormFilterAdvanced[];
    defaultValues?: Record<string, any>;
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
                                     defaultValues,
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
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValues, queryClient]);

    const getDefaultValues = () => {
        if (formFilterAdvanceds.length == 0) {
            return defaultValues;
        }

        const generatedDefaultValues = formFilterAdvanceds.reduce(
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
            ...generatedDefaultValues,
            ...defaultValues,
        };
    };

    const defaultSchema = z.object({
        id: z.string().nullable().optional(),
        date: z
            .object({
                from: z.date().optional(),
                to: z.date().optional(),
            })
            .refine((date) => !!date.to, {message: "End Date is required."})
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
        defaultValues: getDefaultValues(),
    });

    const formValues = useWatch({
        control: form.control,
    });

    const getQueryParams = useCallback((): BaseQueryableQuery => {
        const filterParams: Record<string, any> = {};

        columnFilters.forEach((filter) => {
            filterParams[filter.id] = filter.value;
        });

        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value) && value.every(v => typeof v === 'boolean')) {
                    filterParams[key] = value;
                } else if (typeof value === 'object' && value !== null) {
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


    const {data, isFetching, error} = useQuery({
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

    const isFiltered = table.getState().columnFilters.length > 0;

    const renderFormFields = () => {
        return formFilterAdvanceds.map((fieldConfig: any) => (
            <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={fieldConfig.render}
            />
        ));
    };

    const handleClear = () => {
        form.reset();
    };
    return (
        <div ref={scrollRef} className="space-y-4">
            <DataTableToolbar
                form={form}
                table={table}
                filterEnums={filterEnums}
                deleteAll={deleteAll}
                isFiltered={isFiltered}
                isSheetOpen={isSheetOpen}
                columnSearch={columnSearch}
                handleFilterClick={handleFilterClick}
                handleSheetChange={handleSheetChange}
                handleClear={handleClear}
                renderFormFields={renderFormFields}
            />
            {isFetching && !isTyping ? (
                <DataTableSkeleton
                    columnCount={5}
                    searchableColumnCount={1}
                    filterableColumnCount={1}
                    cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
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
        </div>
    );
}
