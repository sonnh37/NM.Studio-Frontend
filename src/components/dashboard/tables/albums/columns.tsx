"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Album} from "@/types/album";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/dashboard/data-table/data-table-column-header";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import Actions from "./actions";


export const columns: ColumnDef<Album>[] = [
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
        accessorKey: "title",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Title"/>
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

        accessorKey: "background",
        header: "Background Image",
        cell: ({row}) => {
            const backgroundUrl = row.getValue("background") as string; // Lấy URL của hình ảnh từ dữ liệu album
            return (
                <Link href={backgroundUrl}>
                    <Image
                        alt={`Album background`}
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        width={64}
                        src={backgroundUrl} // Sử dụng đường dẫn hình ảnh từ dữ liệu
                    />
                </Link>
            );
        },
        enableHiding: false,
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
        header: ({column}) => <DataTableColumnHeader column={column} title=""/>,
        cell: ({row}) => {
            const isDeleted = row.getValue("isDeleted") as boolean;
            if (!isDeleted) {
                return (
                    <Image
                        src="/check.png"
                        width={500}
                        height={500}
                        alt="Gallery Icon"
                        className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                    />
                );
            }
            return (
                <Image
                    src="/uncheck.png"
                    width={500}
                    height={500}
                    alt="Gallery Icon"
                    className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                />
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            return <Actions row={row}/>;
        },
    },
]
