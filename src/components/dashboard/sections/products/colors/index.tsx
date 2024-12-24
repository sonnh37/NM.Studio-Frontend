import {DataTable} from "@/components/common/data-table-generic/data-table";
import {isActive_options, isDeleted_options,} from "@/components/common/filters";
import {Button} from "@/components/ui/button";
import {colorService} from "@/services/color-service";
import {productXColorService} from "@/services/product-x-color-service";
import {ProductXColorCreateCommand, ProductXColorUpdateCommand,} from "@/types/commands/product-x-color-command";
import {Color} from "@/types/color";
import {ProductXColor} from "@/types/product-x-color";
import {ColorGetAllQuery} from "@/types/queries/color-query";
import {useQueryClient} from "@tanstack/react-query";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {GrSubtract} from "react-icons/gr";
import {HiOutlinePlus} from "react-icons/hi";
import {toast} from "sonner";
import {columns} from "./columns";
import {Badge} from "@/components/ui/badge";
import {DataTableColumnHeader} from "@/components/common/data-table-generic/data-table-column-header";
import {DataTableColorsInProduct} from "./data-table-sizes";

interface DataTableColorsProps {
    productId?: string;
    productXColors?: ProductXColor[];
    tab?: number;
}

export default function DataTableColors({
                                            productId,
                                            tab,
                                            productXColors,
                                        }: DataTableColorsProps) {
    const [getQueryParams, setGetQueryParams] = useState<ColorGetAllQuery>();

    useEffect(() => {
        const defaultQueryParams: ColorGetAllQuery = {
            isPagination: true,
            isDeleted: false,
            productId: productId,
        };

        setGetQueryParams(defaultQueryParams);
    }, [productId]);

    const queryClient = useQueryClient();

    const handleRemoveColor = (value: ProductXColor) => {
        const productXColor_: ProductXColorUpdateCommand = {
            colorId: value.colorId,
            productId: productId,
        };

        productXColorService.delete_(productXColor_).then(async (response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({
                    queryKey: ["productXColors", productId],
                });
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const handleAddColor = (value: Color) => {
        const productXColor_: ProductXColorCreateCommand = {
            colorId: value.id,
            productId: productId,
            isActive: true,
        };

        productXColorService.create(productXColor_).then((response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({
                    queryKey: ["productXColors", productId],
                });
                queryClient.invalidateQueries({queryKey: ["data", getQueryParams]});
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const handleUpdateColor = (row: ProductXColor, isActive: boolean) => {
        const productXColor_: ProductXColorUpdateCommand = {
            colorId: row.colorId,
            productId: productId,
            isActive: isActive,
        };

        productXColorService.update(productXColor_).then((response) => {
            if (response.status === 1) {
                queryClient.invalidateQueries({
                    queryKey: ["productXColors", productId],
                });
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    const columns_tab0: ColumnDef<ProductXColor>[] = [
        {
            accessorKey: "select",
            header: ({table}) => <></>,
            cell: ({row}) => (
                <Button
                    type="button"
                    variant="outline"
                    color="icon"
                    onClick={() => handleRemoveColor(row.original)}
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
                        color="icon"
                        onClick={() => handleUpdateColor(row.original, false)}
                    >
                        <Badge variant={"default"}>On</Badge>
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="outline"
                        color="icon"
                        onClick={() => handleUpdateColor(row.original, true)}
                    >
                        <Badge variant={"destructive"}>Off</Badge>
                    </Button>
                );
            },
        },
        ...columns,
    ];

    const columns_tab1: ColumnDef<Color>[] = [
        {
            accessorKey: "select",
            header: ({table}) => <></>,
            cell: ({row}) => {
                return (
                    <Button
                        type="button"
                        color="icon"
                        onClick={() => handleAddColor(row.original)}
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
        <DataTableColorsInProduct
            columns={columns_tab0}
            productId={productId ?? ""}
            data={productXColors ?? []}
        />
    ) : (
        <DataTable
            columns={columns_tab1}
            fetchData={colorService.fetchAll}
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
