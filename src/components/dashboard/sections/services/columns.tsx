"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Service} from "@/types/service";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/dashboard/data-table/data-table-column-header";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import Actions from "./actions";


export const columns: ColumnDef<Service>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Name"/>
        )
    },
    {
        accessorKey: "description",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Description"/>
        ),
        cell: ({row}) => {
            return <div className="truncate max-w-xs">{row.getValue("description")}</div>
        }
    },
    {
        accessorKey: "src",
        header: "Src Image",
        cell: ({row}) => {
            const backgroundUrl = row.getValue("src") as string; // Lấy URL của hình ảnh từ dữ liệu service
            return (
                <Link href={backgroundUrl}>
                    <Image
                        alt={`Service background`}
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        width={64}
                        src={backgroundUrl} // Sử dụng đường dẫn hình ảnh từ dữ liệu
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Price"/>
        ),
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("price"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "duration",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Duration"/>
        ),
    },
    {
        accessorKey: "promotion",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Promotion"/>
        ),
    },
    {
        accessorKey: "isActive",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Is Active"/>
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
    {
        accessorKey: "isDeleted",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title=""/>
        ),
        cell: ({row}) => {
            const isDeleted = row.getValue("isDeleted") as boolean;
            if (!isDeleted) {
                return (
                    <Badge variant="secondary">Active</Badge>
                );
            }
            return (
                <Badge variant="destructive">Deactivate</Badge>
            );
        },
        filterFn: (row, id, value) => {
            const isDeletedValue = row.getValue(id) as boolean;
            return value.includes(isDeletedValue.toString()); // Chuyển đổi boolean sang string để so sánh
        },
        enableGlobalFilter: false
    },
    {
        id: "actions",
        cell: ({row}) => {
            const model = row.original;
            return <Actions id={model.id}/>;
        },
    },
]
