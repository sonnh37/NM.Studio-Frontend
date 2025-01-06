"use client";

import {DataTableColumnHeader} from "@/components/_common/data-table-generic/data-table-column-header";
import {ProductXSize} from "@/types/product-x-size";
import {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<ProductXSize>[] = [
    {
        accessorKey: "product.name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Product Name"/>
        ),
    },
    {
        accessorKey: "size.name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Size Name"/>
        ),
    },
    {
        accessorKey: "isActive",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Is Active"/>
        ),
        cell: ({row}) => {
            const isActive = row.getValue("isActive") as boolean;
            if (isActive) {
                return <>True</>;
            }
            return <>False</>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
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
