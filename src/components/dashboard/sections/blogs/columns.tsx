"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Blog} from "@/types/blog";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/dashboard/common/data-table/data-table-column-header";
import Image from "next/image";
import Link from "next/link";
import Actions from "./actions";
import {Badge} from "@/components/ui/badge";


export const columns: ColumnDef<Blog>[] = [
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
        accessorKey: "thumbnail",
        header: "Thumbnail Image",
        cell: ({row}) => {
            const backgroundUrl = row.getValue("thumbnail") as string; // Lấy URL của hình ảnh từ dữ liệu blog
            return (
                <Link href={backgroundUrl ?? ""}>
                    <Image
                        alt={`Blog background`}
                        className="aspect-square size-[64px] rounded-md object-cover"
                        height={9999}
                        width={9999}
                        src={backgroundUrl ?? ""} // Sử dụng đường dẫn hình ảnh từ dữ liệu
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
        accessorKey: "content",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Content"/>
        ),
        cell: ({row}) => {
            return <div className="truncate max-w-xs">{row.getValue("content")}</div>
        }
    },
    {
        accessorKey: "isFeatured",
        header: ({column}) => <DataTableColumnHeader column={column} title="Is Featured"/>,
        cell: ({row}) => {
            const isFeatured = row.getValue("isFeatured") as boolean;
            if (!isFeatured) {
                return (
                    <Badge variant="outline">In blog</Badge>
                );
            }
            return (
                <Badge>In about page</Badge>
            );
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
    }
]
