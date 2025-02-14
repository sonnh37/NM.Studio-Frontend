import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import {
  isActive_options,
  isDeleted_options,
} from "@/components/_common/filters";
import { Button } from "@/components/ui/button";
import { albumXPhotoService } from "@/services/album-x-photo-service";
import { photoService } from "@/services/photo-service";
import { AlbumXPhoto } from "@/types/album-x-photo";
import {
  AlbumXPhotoCreateCommand,
  AlbumXPhotoUpdateCommand,
} from "@/types/commands/album-x-photo-command";
import { Photo } from "@/types/photo";
import { PhotoGetAllQuery } from "@/types/queries/photo-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { GrSubtract } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import { columns } from "./columns";

interface DataTablePhotosProps {
  albumId?: string;
  albumXPhotos?: AlbumXPhoto[];
  tab?: number;
}

export default function DataTablePhotos({
  albumId,
  tab,
  albumXPhotos,
}: DataTablePhotosProps) {
  const [getQueryParams, setGetQueryParams] = useState<PhotoGetAllQuery>();

  useEffect(() => {
    const defaultQueryParams: PhotoGetAllQuery = {
      isPagination: true,
      isDeleted: false,
      albumId: albumId,
    };

    setGetQueryParams(defaultQueryParams);
  }, [albumId]);

  const queryClient = useQueryClient();
  const handleSelectAll = (value: boolean, table: any) => {
    // const allRows = table.getRowModel().rows;
    // const allSelected_ = allRows.map((row) => row.original);
    // const allSelectedAlbumXPhotos: AlbumXPhotoUpdateCommand[] = allSelected_.map((photo) => ({
    //   photoId: photo.id,
    //   albumId,
    //   isDeleted: false,
    // }));
    // if (value) {
    //   dispatch(setSelectedAlbumXPhotos(allSelectedAlbumXPhotos));
    //   onChange(allSelectedAlbumXPhotos);
    // } else {
    //   dispatch(setSelectedAlbumXPhotos([]));
    //   onChange([]);
    // }
  };

  const handleRemovePhoto = (photoId: string) => {
    const albumXPhoto_: AlbumXPhotoUpdateCommand = {
      photoId,
      albumId,
    };

    albumXPhotoService.delete_(albumXPhoto_).then(async (response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["album", albumId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleAddPhoto = (row: Photo) => {
    const albumXPhoto_: AlbumXPhotoCreateCommand = {
      photoId: row.id,
      albumId,
    };

    albumXPhotoService.create(albumXPhoto_).then((response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["album", albumId] });
        queryClient.invalidateQueries({ queryKey: ["data", getQueryParams] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const columns_tab0: ColumnDef<Photo>[] = [
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
          onClick={() => handleRemovePhoto(row.original.id!)}
        >
          <GrSubtract />
        </Button>
      ),
    },
    ...columns,
  ];

  const columns_tab1: ColumnDef<Photo>[] = [
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
        albumXPhotos!
          .map((m) => m.photo)
          .filter((photo) => photo !== undefined) as Photo[]
      }
    />
  ) : (
    <DataTable
      deleteAll={photoService.delete}
      columns={columns_tab1}
      fetchData={photoService.fetchAll}
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
