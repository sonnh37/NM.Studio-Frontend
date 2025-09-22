import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import {
  isActive_options,
  isDeleted_options,
} from "@/components/_common/filters";
import { Button } from "@/components/ui/button";
import { albumMediaService } from "@/services/album-media-service";
import { mediaFileService } from "@/services/media-file-service";
import {
  AlbumMediaCreateCommand,
  AlbumMediaDeleteCommand,
} from "@/types/commands/album-media-command";
import { AlbumMedia } from "@/types/entities/album-image";
import { MediaFile } from "@/types/entities/media-file";
import { MediaFileGetAllQuery } from "@/types/queries/media-file-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { GrSubtract } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import { columns } from "./columns";
import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { DataTableFilterSheet } from "@/components/_common/data-table-generic/data-table-filter-sheet";
import { DataTableSortColumnsPopover } from "@/components/_common/data-table-generic/data-table-sort-column";
import { DataTableToggleColumnsPopover } from "@/components/_common/data-table-generic/data-table-toggle-columns";
import React from "react";

interface AlbumMediasTableProps {
  albumId?: string;
  albumMedias?: AlbumMedia[];
  tab?: number;
}

export default function AlbumMediasTable({
  albumId,
  tab,
  albumMedias,
}: AlbumMediasTableProps) {
  const [getQueryParams, setGetQueryParams] = useState<MediaFileGetAllQuery>();

  useEffect(() => {
    const query: MediaFileGetAllQuery = {
      pagination: {
        isPagingEnabled: true,
      },
      albumId: albumId,
      isDeleted: false,
    };

    setGetQueryParams(query);
  }, [albumId]);

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

  const queryClient = useQueryClient();

  const columns_tab0: ColumnDef<MediaFile>[] = [
    {
      accessorKey: "select",
      header: ({ table }) => (
        // <Checkbox
        //     checked={
        //         table.getIsAllPageRowsSelected() ||
        //         (table.getIsSomePageRowsSelected() && "indeterminate")
        //     }
        //     onCheckedChange={(value) => handleSelectAll(!!value, table)}
        //     aria-label="Select all"
        // />
        <></>
      ),
      cell: ({ row }) => (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => handleRemovePhoto(row.original)}
        >
          <GrSubtract />
        </Button>
      ),
    },
    ...columns,
  ];

  const columns_tab1: ColumnDef<MediaFile>[] = [
    {
      accessorKey: "select",
      header: ({ table }) => (
        // <Checkbox
        //     checked={
        //         table.getIsAllPageRowsSelected() ||
        //         (table.getIsSomePageRowsSelected() && "indeterminate")
        //     }
        //     onCheckedChange={(value) => handleSelectAll(!!value, table)}
        //     aria-label="Select all"
        // />
        <></>
      ),
      cell: ({ row }) => {
        return (
          <Button
            type="button"
            size="icon"
            onClick={() => handleAddPhoto(row.original)}
          >
            <HiOutlinePlus />
          </Button>
        );
      },
    },
    ...columns,
  ];

  const { data, isFetching, error } = useQuery({
    queryKey: ["data", getQueryParams],
    queryFn: () => mediaFileService.getAll(getQueryParams),
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

  const table = useReactTable({
    data: data?.data?.results ?? [],
    columns: tab == 0 ? columns_tab0 : columns_tab1,
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
    if (columnFilters.length > 0) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }
  }, [columnFilters]);

  const handleRemovePhoto = (modal: MediaFile) => {
    const command: AlbumMediaDeleteCommand = {
      mediaFileId: modal.id,
      // id: modal.,
      isPermanent: true,
      albumId: albumId,
    };

    albumMediaService.delete(command).then(async (response) => {
      if (response.status === 1) {
        queryClient.refetchQueries({ queryKey: ["album", albumId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleAddPhoto = (row: MediaFile) => {
    const command: AlbumMediaCreateCommand = {
      mediaFileId: row.id,
      albumId,
    };

    albumMediaService.create(command).then((response) => {
      if (response.status === 1) {
        queryClient.refetchQueries({ queryKey: ["album", albumId] });
        queryClient.refetchQueries({ queryKey: ["data", getQueryParams] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <>
      {tab == 0 && albumMedias ? (
        <>
          <DataOnlyTable
            columns={columns_tab0}
            data={
              albumMedias
                .map((m) => m.mediaFile)
                .filter((mediaFile) => mediaFile !== undefined) as MediaFile[]
            }
          />
        </>
      ) : (
        <>
          <DataTableComponent isLoading={isFetching} table={table}>
            <DataTableToolbar table={table}>
              <DeleteBaseEntitysDialog
                list={table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original)}
                onSuccess={() => table.toggleAllRowsSelected(false)}
              />

              <DataTableSortColumnsPopover table={table} />
              <DataTableToggleColumnsPopover table={table} />
            </DataTableToolbar>
          </DataTableComponent>
        </>
      )}
    </>
  );
}
