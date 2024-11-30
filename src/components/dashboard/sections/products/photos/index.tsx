import {columns} from "./columns";
import {isActive_options, isDeleted_options,} from "@/components/common/filters";
import {DataTable} from "@/components/common/data-table-generic/data-table";
import {useEffect, useState} from "react";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Photo} from "@/types/photo";
import {ColumnDef} from "@tanstack/react-table";
import {ProductXPhotoCreateCommand, ProductXPhotoUpdateCommand} from "@/types/commands/product-x-photo-command";
import {photoService} from "@/services/photo-service";
import {DataOnlyTable} from "@/components/common/data-table-origin/data-only-table";
import {GrSubtract} from "react-icons/gr";
import {HiOutlinePlus} from "react-icons/hi";
import {Button} from "@/components/ui/button";
import {productXPhotoService} from "@/services/product-x-photo-service";
import {ProductXPhoto} from "@/types/product-x-photo";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";

interface DataTablePhotosProps {
    productId?: string;
    productXPhotos?: ProductXPhotoUpdateCommand[];
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
            isDeleted: [false],
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
        //   isDeleted: [false],
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
                queryClient.invalidateQueries({queryKey: ["product", productId]});
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
                queryClient.invalidateQueries({queryKey: ["product", productId]});
                queryClient.invalidateQueries({queryKey: ["data", getQueryParams]});
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };


    const columns_tab0: ColumnDef<Photo>[] = [
        {
            accessorKey: "select",
            header: ({table}) => (
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
            cell: ({row}) => (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemovePhoto(row.original.id!)}
                >
                    <GrSubtract/>
                </Button>
            ),
        },
        ...columns,
    ];

    const columns_tab1: ColumnDef<Photo>[] = [
        {
            accessorKey: "select",
            header: ({table}) => (
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
            cell: ({row}) => {
                return (
                    <Button
                        type="button"
                        size="icon"
                        onClick={() => handleAddPhoto(row.original)}
                    >
                        <HiOutlinePlus/>
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
            deleteData={photoService.delete}
            columns={columns_tab1}
            fetchData={photoService.fetchAll}
            columnSearch="name"
            defaultValues={getQueryParams}
            filterEnums={[
                {columnId: "isActive", title: "Is Active", options: isActive_options},
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
