import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { DataOnlyTable } from "@/components/_common/data-table-origin/data-only-table";
import {
    isActive_options,
    isDeleted_options,
} from "@/components/_common/filters";
import { Button } from "@/components/ui/button";
import { photoService } from "@/services/photo-service";
import { productXPhotoService } from "@/services/product-x-photo-service";
import {
    ProductXPhotoCreateCommand,
    ProductXPhotoUpdateCommand,
} from "@/types/commands/product-x-photo-command";
import { Photo } from "@/types/photo";
import { ProductXPhoto } from "@/types/product-x-photo";
import { PhotoGetAllQuery } from "@/types/queries/photo-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { GrSubtract } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from "sonner";
import { columns } from "./columns";

interface DataTablePhotosProps {
  productId?: string;
  productXPhotos?: ProductXPhoto[];
  tab?: number;
}

export default function DataTablePhotos({
  productId,
  tab,
  productXPhotos,
}: DataTablePhotosProps) {
  const [getQueryParams, setGetQueryParams] = useState<PhotoGetAllQuery>();

  useEffect(() => {
    const defaultQueryParams: PhotoGetAllQuery = {
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
    // const allSelectedProductXPhotos: ProductXPhotoUpdateCommand[] = allSelected_.map((photo) => ({
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
    const productXPhoto_: ProductXPhotoUpdateCommand = {
      photoId,
      productId,
    };

    productXPhotoService.delete_(productXPhoto_).then(async (response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleAddPhoto = (row: Photo) => {
    const productXPhoto_: ProductXPhotoCreateCommand = {
      photoId: row.id,
      productId,
    };

    productXPhotoService.create(productXPhoto_).then((response) => {
      if (response.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
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
        productXPhotos!
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
