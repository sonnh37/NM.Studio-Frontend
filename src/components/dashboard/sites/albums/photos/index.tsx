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
  AlbumMediaDeleteCommand
} from "@/types/commands/album-media-command";
import { AlbumMedia } from "@/types/entities/album-media";
import { MediaFile } from "@/types/entities/media-file";
import { MediaFileGetAllQuery } from "@/types/queries/media-file-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { GrSubtract } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import { columns } from "./columns";

interface DataTablePhotosProps {
  albumId?: string;
  albumMedias?: AlbumMedia[];
  tab?: number;
}

export default function DataTablePhotos({
  albumId,
  tab,
  albumMedias,
}: DataTablePhotosProps) {
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

  const queryClient = useQueryClient();
  const handleSelectAll = (value: boolean, table: any) => {
    // const allRows = table.getRowModel().rows;
    // const allSelected_ = allRows.map((row) => row.original);
    // const allSelectedAlbumMedias: AlbumMediaUpdateCommand[] = allSelected_.map((mediaFile) => ({
    //   photoId: mediaFile.id,
    //   albumId,
    //   isDeleted: false,
    // }));
    // if (value) {
    //   dispatch(setSelectedAlbumMedias(allSelectedAlbumMedias));
    //   onChange(allSelectedAlbumMedias);
    // } else {
    //   dispatch(setSelectedAlbumMedias([]));
    //   onChange([]);
    // }
  };

  const handleRemovePhoto = (modal: MediaFile) => {
    const command: AlbumMediaDeleteCommand = {
      mediaFileId: modal.id,
      isPermanent: true,
      albumId: albumId,
    };

    albumMediaService.delete(command).then(async (response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["album", albumId] });
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
        queryClient.invalidateQueries({ queryKey: ["album", albumId] });
        queryClient.invalidateQueries({ queryKey: ["data", getQueryParams] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

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

  return tab == 0 ? (
    <DataOnlyTable
      columns={columns_tab0}
      data={
        albumMedias!
          .map((m) => m.mediaFile)
          .filter((mediaFile) => mediaFile !== undefined) as MediaFile[]
      }
    />
  ) : (
    <DataTable
      deleteFunc={mediaFileService.delete}
      columns={columns_tab1}
      getAllFunc={mediaFileService.getAll}
      columnSearch="href"
      defaultParams={getQueryParams}
      filterEnums={[
        { columnId: "isActive", title: "Is Active", options: isActive_options },
        {
          columnId: "isDeleted",
          title: "Is deleted",
          options: isDeleted_options,
        },
      ]}
      // formFilterAdvanceds={formFilterAdvanceds}
    />
  );
}
