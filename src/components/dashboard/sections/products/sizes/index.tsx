import {DataTable} from "@/components/common/data-table-generic/data-table";
import {isActive_options, isDeleted_options,} from "@/components/common/filters";
import {Button} from "@/components/ui/button";
import {sizeService} from "@/services/size-service";
import {productXSizeService} from "@/services/product-x-size-service";
import {ProductXSizeCreateCommand, ProductXSizeUpdateCommand,} from "@/types/commands/product-x-size-command";
import {Size} from "@/types/size";
import {ProductXSize} from "@/types/product-x-size";
import {SizeGetAllQuery} from "@/types/queries/size-query";
import {useQueryClient} from "@tanstack/react-query";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {GrSubtract} from "react-icons/gr";
import {HiOutlinePlus} from "react-icons/hi";
import {toast} from "sonner";
import {columns} from "./columns";
import {DataTableSizesInProduct} from "./data-table-sizes";
import {Badge} from "@/components/ui/badge";
import {DataTableColumnHeader} from "@/components/common/data-table-generic/data-table-column-header";

interface DataTableSizesProps {
    productId?: string;
    productXSizes?: ProductXSize[];
    tab?: number;
}

export default function DataTableSizes({
                                           productId,
                                           tab,
                                           productXSizes,
                                       }: DataTableSizesProps) {
    const [getQueryParams, setGetQueryParams] = useState<SizeGetAllQuery>();

    useEffect(() => {
        const defaultQueryParams: SizeGetAllQuery = {
            isPagination: true,
            isDeleted: false,
            productId: productId,
        };

        setGetQueryParams(defaultQueryParams);
    }, [productId]);

    const queryClient = useQueryClient();

    const handleRemoveSize = (value: ProductXSize) => {
        const productXSize_: ProductXSizeUpdateCommand = {
            sizeId: value.sizeId,
            productId: productId,
        };

        productXSizeService.delete_(productXSize_).then(async (response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({
                    queryKey: ["productXSizes", productId],
                });
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const handleAddSize = (value: Size) => {
        const productXSize_: ProductXSizeCreateCommand = {
            sizeId: value.id,
            productId: productId,
            isActive: true,
        };

        productXSizeService.create(productXSize_).then((response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({
                    queryKey: ["productXSizes", productId],
                });
                queryClient.invalidateQueries({queryKey: ["data", getQueryParams]});
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const handleUpdateSize = (row: ProductXSize, isActive: boolean) => {
        const productXSize_: ProductXSizeUpdateCommand = {
            sizeId: row.sizeId,
            productId: productId,
            isActive: isActive,
        };

        productXSizeService.update(productXSize_).then((response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({
                    queryKey: ["productXSizes", productId],
                });
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const columns_tab0: ColumnDef<ProductXSize>[] = [
        {
            accessorKey: "select",
            header: ({table}) => <></>,
            cell: ({row}) => (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveSize(row.original)}
                >
                    <GrSubtract/>
                </Button>
            ),
        },
        {
            accessorKey: "activeEdit",
            header: ({table}) => <p>Edit active</p>,
            cell: ({row}) => {
                const isActive = row.getValue("isActive") as boolean;
                return isActive ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateSize(row.original, false)}
                    >
                        <Badge variant={"default"}>On</Badge>
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateSize(row.original, true)}
                    >
                        <Badge variant={"destructive"}>Off</Badge>
                    </Button>
                );
            },
        },
        ...columns,
    ];

    const columns_tab1: ColumnDef<Size>[] = [
        {
            accessorKey: "select",
            header: ({table}) => <></>,
            cell: ({row}) => {
                return (
                    <Button
                        type="button"
                        size="icon"
                        onClick={() => handleAddSize(row.original)}
                    >
                        <HiOutlinePlus/>
                    </Button>
                );
            },
        },
        {
            accessorKey: "name",
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Name"/>
            ),
        },

        {
            accessorKey: "createdDate",
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Data created"/>
            ),
            cell: ({row}) => {
                const date = new Date(row.getValue("createdDate"));
                return date.toLocaleDateString("en-US", {
                    weekday: "short", // Thu
                    year: "numeric", // 2022
                    month: "short", // Oct
                    day: "numeric", // 20
                });
            },
        },
    ];

    return tab == 0 ? (
        <DataTableSizesInProduct
            columns={columns_tab0}
            productId={productId ?? ""}
            data={productXSizes ?? []}
        />
    ) : (
        <DataTable
            columns={columns_tab1}
            fetchData={sizeService.fetchAll}
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
