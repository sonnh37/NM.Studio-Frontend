import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import {
  isActive_options,
  isDeleted_options,
} from "@/components/_common/filters";
import { Button } from "@/components/ui/button";
import { albumImageService } from "@/services/album-image-service";

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
import { Status } from "@/types/models/business-result";
import { AlbumImage } from "@/types/entities/album-image";
import { AlbumImageCreateCommand, AlbumImageDeleteCommand } from "@/types/cqrs/commands/album-media-command";
import { MediaBaseGetAllQuery } from "@/types/cqrs/queries/media-base-query";
import { MediaBase } from "@/types/entities/media-base";
import { mediaBaseService } from "@/services/media-base-service";

interface AlbumImagesTableProps {
  albumId?: string;
  albumImages?: AlbumImage[];
  tab?: number;
}

export default function AlbumImagesTable({
  albumId,
  tab,
  albumImages,
}: AlbumImagesTableProps) {
  const [getQueryParams, setGetQueryParams] = useState<MediaBaseGetAllQuery>();

  useEffect(() => {
    const query: MediaBaseGetAllQuery = {
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

  const columns_tab0: ColumnDef<MediaBase>[] = [
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

  const columns_tab1: ColumnDef<MediaBase>[] = [
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
    queryFn: () => mediaBaseService.getAll(getQueryParams),
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

  const table = useReactTable({
    data: data?.data?.results ?? [],
    columns: tab == 0 ? columns_tab0 : columns_tab1,
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
    if (columnFilters.length > 0) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }
  }, [columnFilters]);

  const handleRemovePhoto = (modal: MediaBase) => {
    const command: AlbumImageDeleteCommand = {
      imageId: modal.id,
      isPermanent: true,
      albumId: albumId,
    };

    albumImageService.delete(command).then(async (response) => {
      if (response.status === Status.OK) {
        queryClient.refetchQueries({ queryKey: ["album", albumId] });
        toast.success("Removed from album.");
      } else {
        toast.error(response.error?.detail || "Failed to remove.");
      }
    });
  };

  const handleAddPhoto = (row: MediaBase) => {
    const command: AlbumImageCreateCommand = {
      imageId: row.id,
      albumId,
    };

    albumImageService.create(command).then((response) => {
      if (response.status == Status.OK) {
        queryClient.refetchQueries({ queryKey: ["album", albumId] });
        queryClient.refetchQueries({ queryKey: ["data", getQueryParams] });
        toast.success("Removed from album.");
      } else {
        toast.error(response.error?.detail || "Failed to remove.");
      }
    });
  };

  return (
    <>
      {tab == 0 && albumImages ? (
        <>
          <DataOnlyTable
            columns={columns_tab0}
            data={
              albumImages
                .map((m) => m.image)
                .filter((image) => image !== undefined) as MediaBase[]
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
