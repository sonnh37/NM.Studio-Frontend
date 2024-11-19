import {columns} from "./columns";
import {isActive_options, isDeleted_options,} from "@/components/common/filters";
import {DataTable} from "@/components/common/data-table-generic/data-table";
import {useEffect, useState} from "react";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Photo} from "@/types/photo";
import {ColumnDef} from "@tanstack/react-table";
import {AlbumXPhotoUpdateCommand} from "@/types/commands/album-x-photo-command";
import {photoService} from "@/services/photo-service";
import {DataOnlyTable} from "@/components/common/data-table-origin/data-only-table";
import {GrSubtract} from "react-icons/gr";
import {HiOutlinePlus} from "react-icons/hi";
import {Button} from "@/components/ui/button";
import {albumXPhotoService} from "@/services/album-x-photo-service";
import {AlbumXPhoto} from "@/types/album-x-photo";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";
import {formFilterAdvanceds} from "@/components/dashboard/sections/photos/filter-advanced-form";

interface DataTablePhotosProps {
    albumId?: string;
    albumXPhotos?: AlbumXPhotoUpdateCommand[];
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
        const albumXPhoto_: AlbumXPhoto = {
            photoId,
            albumId,
            isDeleted: false,
        };

        albumXPhotoService.delete_(albumXPhoto_).then(async (response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({queryKey: ["album", albumId]});
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const handleAddPhoto = (row: Photo) => {
        const albumXPhoto_: AlbumXPhoto = {
            photoId: row.id,
            albumId,
            isDeleted: false,
        };

        albumXPhotoService.create(albumXPhoto_).then((response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({queryKey: ["album", albumId]});
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
                albumXPhotos!
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
