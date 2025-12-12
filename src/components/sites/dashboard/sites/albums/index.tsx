"use client";
import { columns } from "./columns";

import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import { isDeleted_options } from "@/components/_common/filters";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useQueryParams } from "@/hooks/use-query-params";
import { cn, getDefaultFormFilterValues, processResponse } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { mediaBaseService } from "@/services/media-base-service";
import { mediaUploadService } from "@/services/media-upload-service";
import {
  AlbumSetCoverUpdateCommand,
  AlbumWithImagesCreateCommand,
} from "@/types/cqrs/commands/album-command";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { Album } from "@/types/entities/album";
import { BaseEntity } from "@/types/entities/base/base";
import { MediaBase, ResourceType } from "@/types/entities/media-base";
import { FilterEnum } from "@/types/filter-enum";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { Status } from "@/types/models/business-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { check } from "prettier";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { formatDate } from "@/lib/utils/date-utils";
import { Spinner } from "@/components/ui/spinner";
import { ALBUM_FETCH_KEY } from "./keys/album-key";

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
const query_key = ALBUM_FETCH_KEY;
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

  const [isOpen, setIsOpen] = useState(false);

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", queryParam?.toLowerCase()],
    queryFn: async () => {
      const response = await albumService.getById(queryParam as string, [
        "albumImages.image",
      ]);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!queryParam,
  });

  useEffect(() => {
    if (album) {
      setIsOpen(true);
    }
  }, [album]);
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
  const pathname = usePathname();
  const router = useRouter();
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

    params.includeProperties = ["albumImages", "thumbnail", "cover"];

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

  const accordion = {
    defaultValue: ["Albums"],
    type: "multiple" as const,
    collapsible: true,
    item1: "Albums",
    item2: "Medias",
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      // Xóa param q
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <Accordion type="single" className="w-full" defaultValue="albums">
        <AccordionItem value="albums">
          <AccordionTrigger>Albums</AccordionTrigger>
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
                <Link
                  className="text-primary-foreground sm:whitespace-nowrap"
                  href={`${pathname}/new`}
                >
                  <Button size={"sm"}>+ Thêm</Button>
                </Link>
              </DataTableToolbar>
            </DataTableComponent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
