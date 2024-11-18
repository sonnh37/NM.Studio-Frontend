import {columns} from "./columns";
import {isActive_options, isDeleted_options,} from "@/components/common/filters";
import {DataTable} from "@/components/common/data-table-generic/data-table";
import {useEffect, useState} from "react";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Photo} from "@/types/photo";
import {ColumnDef} from "@tanstack/react-table";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setSelectedAlbumXPhotos} from "@/lib/slices/photosSlice";
import {Checkbox} from "@/components/ui/checkbox";
import {AlbumXPhotoUpdateCommand} from "@/types/commands/album-x-photo-command";
import {photoService} from "@/services/photo-service";
import {DataOnlyTable} from "@/components/common/data-table-origin/data-only-table";
import {GrSubtract} from "react-icons/gr";
import {HiOutlinePlus} from "react-icons/hi";
import {Button} from "@/components/ui/button";
import {albumXPhotoService} from "@/services/album-x-photo-service";
import {AlbumXPhoto} from "@/types/album-x-photo";
import {toast} from "sonner";
import {isEqual} from "lodash";

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
    const dispatch = useAppDispatch();
    const reduxSelectedAlbumXPhotos = useAppSelector(
        (state) => state.photos.selectedAlbumXPhotos
    );
    const [getQueryParams, setGetQueryParams] = useState<PhotoGetAllQuery>();
    const selectedAlbumXPhotos = useAppSelector(
        (state) => state.photos.selectedAlbumXPhotos
    );
    useEffect(() => {
        const defaultQueryParams: PhotoGetAllQuery = {
            isPagination: true,
            albumId: albumId,
        };

        setGetQueryParams(defaultQueryParams);
    }, [albumId]);
    useEffect(() => {
        console.log("check_recieve_albumxPhoto", albumXPhotos)
        if (albumXPhotos) {
            const albumXPhotoIds = new Set(albumXPhotos.map((photo) => photo.photoId));
            const mergedPhotos = [
                ...albumXPhotos,
                ...selectedAlbumXPhotos.filter((photo) => !albumXPhotoIds.has(photo.photoId)),
            ];

            // Kiểm tra sâu để tránh dispatch không cần thiết
            if (!isEqual(mergedPhotos, selectedAlbumXPhotos)) {
                dispatch(setSelectedAlbumXPhotos(mergedPhotos));
            }
        }
    }, [albumXPhotos, selectedAlbumXPhotos, dispatch]);

    useEffect(() => {
        console.log(
            "Redux selectedAlbumXPhotos updated:",
            reduxSelectedAlbumXPhotos
        );
    }, [reduxSelectedAlbumXPhotos]);


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

        albumXPhotoService.delete_(albumXPhoto_).then((response) => {
            if (response.status === 1) {
                const updatedPhotos = selectedAlbumXPhotos.filter(
                    (photo) => photo.photoId !== photoId
                );

                dispatch(setSelectedAlbumXPhotos(updatedPhotos));
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

        const updatedPhotos = [...selectedAlbumXPhotos, albumXPhoto_];

        albumXPhotoService.create(albumXPhoto_).then((response) => {
            if (response.status === 1) {
                dispatch(setSelectedAlbumXPhotos(updatedPhotos));
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
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => handleSelectAll(!!value, table)}
                    aria-label="Select all"
                />
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
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => handleSelectAll(!!value, table)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => {
                const isSelected = selectedAlbumXPhotos.some(
                    (photo) =>
                        photo.photoId === row.original.id && photo.albumId === albumId
                );

                if (isSelected) {
                    return null;
                }

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
        />
    );
}
