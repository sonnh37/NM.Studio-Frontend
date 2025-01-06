"use client";

import {DataTableColumnHeader} from "@/components/_common/data-table-generic/data-table-column-header";
import {ProductXColor} from "@/types/product-x-color";
import {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<ProductXColor>[] = [
    {
        accessorKey: "product.name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Product Name"/>
        ),
    },
    {
        accessorKey: "color.name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Color Name"/>
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
