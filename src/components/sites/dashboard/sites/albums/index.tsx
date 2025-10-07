import { columns } from "./columns";

import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import { DataTableDownload } from "@/components/_common/data-table-generic/data-table-download";
import { DataTableFilterSheet } from "@/components/_common/data-table-generic/data-table-filter-sheet";
import { DataTableSortColumnsPopover } from "@/components/_common/data-table-generic/data-table-sort-column";
import { DataTableToggleColumnsPopover } from "@/components/_common/data-table-generic/data-table-toggle-columns";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { isDeleted_options } from "@/components/_common/filters";
import DataTablePhotos from "@/components/sites/dashboard/sites/albums/medias";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn, getDefaultFormFilterValues } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
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
import { useEffect, useMemo, useRef, useState } from "react";
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
  {
    name: "slug",
    label: "Slug",
    defaultValue: null,
    render: ({ field }: { field: any }) => (
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input placeholder="Title..." {...field} />
        </FormControl>
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
  slug: z.string().nullable().optional(),
  isDeleted: z.boolean().nullable().optional(),
});
//#endregion
export default function AlbumTable() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const tabsRef = useRef<HTMLDivElement>(null);

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", queryParam?.toLowerCase()],
    queryFn: async () => {
      const response = await albumService.getById(queryParam as string, [
        "albumImages",
        "albumImages.image",
      ]);
      return response.data;
    },
    refetchOnWindowFocus: false,
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

  const form = useForm<z.infer<typeof defaultSchema>>({
    resolver: zodResolver(defaultSchema),
    defaultValues: getDefaultFormFilterValues(formFilterAdvanceds),
  });

  const formValues = useWatch({
    control: form.control,
  });

  const queryParams = useMemo(() => {
    const params: AlbumGetAllQuery = useQueryParams(
      formValues,
      columnFilters,
      pagination,
      sorting
    );

    params.includeProperties = ["albumImages"];

    return { ...params };
  }, [formValues, columnFilters, pagination, sorting]);

  const { data, isFetching, error } = useQuery({
    queryKey: [query_key, queryParams],
    queryFn: () => albumService.getAll(queryParams),
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

  const table = useReactTable({
    data: data?.data?.results ?? [],
    columns,
    pageCount: data?.data?.totalPages ?? -1,
    rowCount: data?.data?.totalCount ?? 0,
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

  const accordion = {
    defaultValue: ["Albums"],
    type: "multiple" as const,
    collapsible: true,
    item1: "Albums",
    item2: "Medias",
  };

  const pathname = usePathname();

  return (
    <Accordion
      type={accordion.type}
      className="w-full"
      defaultValue={accordion.defaultValue}
    >
      <AccordionItem value={accordion.item1}>
        <AccordionTrigger>{accordion.item1.toString()}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <DataTableComponent
            className="p-1"
            isLoading={isFetching}
            deletePermanentFunc={(command) => albumService.delete(command)}
            updateUndoFunc={(command) => albumService.update(command)}
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
                deleteFunc={(command) => albumService.delete(command)}
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
                  className="ring-offset-background hover:ring-primary/90 transition-all duration-300 hover:ring-2 hover:ring-offset-2"
                >
                  Add
                </Button>
              </Link>
            </DataTableToolbar>
          </DataTableComponent>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={accordion.item2}>
        <AccordionTrigger>{accordion.item2.toString()}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          {isLoading || !album ? null : (
            <Tabs ref={tabsRef} defaultValue="selected" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
              </TabsList>

              <TabsContent value="selected">
                <Card className="p-4">
                  <DataTablePhotos
                    albumId={album.id}
                    albumImages={album.albumImages ?? []}
                    tab={0}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="available">
                <Card className="p-4">
                  <DataTablePhotos
                    albumId={album.id}
                    albumImages={album.albumImages ?? []}
                    tab={1}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
