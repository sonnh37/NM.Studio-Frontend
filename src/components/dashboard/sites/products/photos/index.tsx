import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import {
    isActive_options,
    isDeleted_options,
} from "@/components/_common/filters";
import { Button } from "@/components/ui/button";
import { mediaFileService } from "@/services/media-file-service";
import { productMediaService } from "@/services/product-media-service";
import {
    ProductMediaCreateCommand,
    ProductMediaUpdateCommand,
} from "@/types/commands/product-media-command";
import { MediaFile } from "@/types/entities/media-file";
import { ProductMedia } from "@/types/entities/product-media";
import { MediaFileGetAllQuery } from "@/types/queries/media-file-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { GrSubtract } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import { columns } from "./columns";

interface DataTablePhotosProps {
  productId?: string;
  productXPhotos?: ProductMedia[];
  tab?: number;
}

export default function DataTablePhotos({
  productId,
  tab,
  productXPhotos,
}: DataTablePhotosProps) {
  const [getQueryParams, setGetQueryParams] = useState<MediaFileGetAllQuery>();

  useEffect(() => {
    const defaultQueryParams: MediaFileGetAllQuery = {
      isPagination: true,
      isDeleted: false,
      productId: productId,
    };

    setGetQueryParams(defaultQueryParams);
  }, [productId]);

  const queryClient = useQueryClient();
  const handleSelectAll = (value: boolean, table: any) => {
    // const allRows = table.getRowModel().rows;
    // const allSelected_ = allRows.map((row) => row.original);
    // const allSelectedProductXPhotos: ProductMediaUpdateCommand[] = allSelected_.map((photo) => ({
    //   photoId: photo.id,
    //   productId,
    //   isDeleted: false,
    // }));
    // if (value) {
    //   dispatch(setSelectedProductXPhotos(allSelectedProductXPhotos));
    //   onChange(allSelectedProductXPhotos);
    // } else {
    //   dispatch(setSelectedProductXPhotos([]));
    //   onChange([]);
    // }
  };

  const handleRemovePhoto = (photoId: string) => {
    const productXPhoto_: ProductMediaUpdateCommand = {
      photoId,
      productId,
    };

    productMediaService.delete_(productXPhoto_).then(async (response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleAddPhoto = (row: MediaFile) => {
    const productXPhoto_: ProductMediaCreateCommand = {
      photoId: row.id,
      productId,
    };

    productMediaService.create(productXPhoto_).then((response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
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
          onClick={() => handleRemovePhoto(row.original.id!)}
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
        productXPhotos!
          .map((m) => m.photo)
          .filter((photo) => photo !== undefined) as MediaFile[]
      }
    />
  ) : (
    <DataTable
      deleteAll={mediaFileService.delete}
      columns={columns_tab1}
      fetchData={mediaFileService.getAll}
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
