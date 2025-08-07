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
  ProductMediaDeleteCommand,
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
  productMedias?: ProductMedia[];
  tab?: number;
}

export default function DataTablePhotos({
  productId,
  tab,
  productMedias,
}: DataTablePhotosProps) {
  const [getQueryParams, setGetQueryParams] = useState<MediaFileGetAllQuery>();

  useEffect(() => {
    const defaultQueryParams: MediaFileGetAllQuery = {
      pagination: {
        isPagingEnabled: true,
      },
      isDeleted: false,
      productId: productId,
    };

    setGetQueryParams(defaultQueryParams);
  }, [productId]);

  const queryClient = useQueryClient();
  const handleSelectAll = (value: boolean, table: any) => {
    // const allRows = table.getRowModel().rows;
    // const allSelected_ = allRows.map((row) => row.original);
    // const allSelectedProductMedias: ProductMediaUpdateCommand[] = allSelected_.map((mediaFile) => ({
    //   photoId: mediaFile.id,
    //   productId,
    //   isDeleted: false,
    // }));
    // if (value) {
    //   dispatch(setSelectedProductMedias(allSelectedProductMedias));
    //   onChange(allSelectedProductMedias);
    // } else {
    //   dispatch(setSelectedProductMedias([]));
    //   onChange([]);
    // }
  };

  const handleRemovePhoto = (photoId: string) => {
    const productMedia_: ProductMediaDeleteCommand = {
      photoId,
      isPermanent: true,
      productId,
    };

    productMediaService.delete(productMedia_).then(async (response) => {
      if (response.status === 1) {
        queryClient.refetchQueries({ queryKey: ["product", productId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleAddPhoto = (row: MediaFile) => {
    const productMedia_: ProductMediaCreateCommand = {
      photoId: row.id,
      productId,
    };

    productMediaService.create(productMedia_).then((response) => {
      if (response.status === 1) {
        queryClient.refetchQueries({ queryKey: ["product", productId] });
        queryClient.refetchQueries({ queryKey: ["data", getQueryParams] });
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
        productMedias!
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
