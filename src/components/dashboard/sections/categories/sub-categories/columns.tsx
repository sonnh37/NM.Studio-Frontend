"use client";

import { DataTableColumnHeader } from "@/components/common/data-table-generic/data-table-column-header";
import { SubCategory } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SubCategory>[] = [
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="SubCategory-name"/>
        ),
    },
    {
        accessorKey: "createdDate",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Data created"/>
        ),
        cell: ({row}) => {
            const date = new Date(row.getValue("createdDate"));
            return date.toLocaleDateString('en-US', {
                weekday: 'short', // Thu
                year: 'numeric',  // 2022
                month: 'short',   // Oct
                day: 'numeric'    // 20
            });
        }
    },
];
