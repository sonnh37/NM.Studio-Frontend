"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Photo} from "@/types/photo";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/dashboard/common/data-table/data-table-column-header";
import Image from "next/image";
import Link from "next/link";
import Actions from "./actions";
import { Badge } from "@/components/ui/badge";


export const columns: ColumnDef<Photo>[] = [
    {
        accessorKey: "select",
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
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            return <Actions row={row}/>;
        },
    },
    {

        accessorKey: "src",
        header: "Src Image",
        cell: ({row}) => {
            const srcUrl = row.getValue("src") as string; // Lấy URL của hình ảnh từ dữ liệu photo
            return (
                <Link href={srcUrl || "#"}>
                    <Image
                        alt={`Photo src`}
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        width={64}
                        src={srcUrl ?? ''} // Sử dụng đường dẫn hình ảnh từ dữ liệu
                    />
                </Link>
            );
        },
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
        accessorKey: "href",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Link to"/>
        )
    },
    {
        accessorKey: "tag",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tag"/>
        )
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
        accessorKey: "isFeatured",
        header: ({column}) => <DataTableColumnHeader column={column} title="Is Featured"/>,
        cell: ({row}) => {
            const isFeatured = row.getValue("isFeatured") as boolean;
            if (!isFeatured) {
                return (
                    <Badge variant="outline">In album</Badge>
                );
            }
            return (
                <Badge>In home page</Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "isDeleted",
        header: ({column}) => <DataTableColumnHeader column={column} title="Is Deleted"/>,
        cell: ({row}) => {
            const isDeleted = row.getValue("isDeleted") as boolean;
            if (!isDeleted) {
                return (
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/smart-thrive.appspot.com/o/Blog%2Fcheck.png?alt=media&token=1bdb7751-4bdc-4af1-b6e1-9b758df3a3d5"
                        width={500}
                        height={500}
                        alt="Gallery Icon"
                        className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                    />
                );
            }
            return (
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/smart-thrive.appspot.com/o/Blog%2Funcheck.png?alt=media&token=3b2b94d3-1c59-4a96-b4c6-312033d868b1"
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

]
