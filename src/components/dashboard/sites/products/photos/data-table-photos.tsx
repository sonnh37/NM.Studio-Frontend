"use client";

import * as React from "react";
import {useRef, useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {X} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {DataOnlyTablePagination} from "@/components/_common/data-table-origin/data-only-table-pagination";
import {DataOnlyTableViewOptions} from "@/components/_common/data-table-origin/data-only-table-view-options";
import {Label} from "@/components/ui/label";
import {productXPhotoService} from "@/services/product-x-photo-service";
import {ProductXPhotoCreateCommand, ProductXPhotoUpdateCommand,} from "@/types/commands/product-x-photo-command";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {PhotoCreateCommand} from "@/types/commands/photo-command";
import {photoService} from "@/services/photo-service";
import {storage} from "../../../../../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {ButtonLoading} from "@/components/_common/button-loading";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    productId: string;
    data: TData[];
}

export function DataTablePhotosInProduct<TData>({
                                                    columns,
                                                    data,
                                                    productId,
                                                }: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    const isFiltered = table.getState().columnFilters.length > 0;

    const queryClient = useQueryClient();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const uploadImageFirebase = async (): Promise<string | null> => {
        if (selectedFile) {
            const storageRef = ref(storage, `Photo/${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            const uploadPromise = new Promise<string>((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    (error) => reject(error),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
                    }
                );
            });

            const downloadURL = await uploadPromise;
            return downloadURL;
        }
        return null;
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleAddPhoto = () => {
        setIsLoading(true);
        // upload image firebase

        if (!selectedFile) {
            setIsLoading(false);
            return;
        }

        const photo_: PhotoCreateCommand = {
            file: selectedFile,
        };
        photoService.create(photo_).then((response) => {
            if (response.status === 1) {
                const photoId = response.data?.id;
                if (photoId) {
                    const productXPhoto_: ProductXPhotoCreateCommand = {
                        photoId: photoId,
                        productId,
                    };
                    productXPhotoService.create(productXPhoto_).then((response) => {
                        if (response.status === 1) {
                            queryClient.invalidateQueries({
                                queryKey: ["product", productId],
                            });

                            toast.success(response.message);
                            setSelectedFile(null);

                            if (fileInputRef.current) {
                                fileInputRef.current.value = ""; // Reset giá trị của input file
                            }
                        } else {
                            toast.error(response.message);
                        }
                    });
                }
            } else {
                toast.error(response.message);
            }
            setIsLoading(false);
        });
    };
    return (
        <div className="space-y-4">
            <div className="flex flex-row gap-3 items-end">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                        id="picture"
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                </div>

                {isLoading ? (
                    <ButtonLoading/>
                ) : (
                    <Button
                        variant={"ghost"}
                        onClick={handleAddPhoto}
                        disabled={isLoading}
                    >
                        Add Photo
                    </Button>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Filter tasks..."
                        value={(table.getColumn("href")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("href")?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <X className="ml-2 h-4 w-4"/>
                        </Button>
                    )}
                </div>
                <DataOnlyTableViewOptions table={table}/>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataOnlyTablePagination table={table}/>
        </div>
    );
}
