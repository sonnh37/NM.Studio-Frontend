"use client";

import {DataTableColumnHeader} from "@/components/_common/data-table-generic/data-table-column-header";
import {Checkbox} from "@/components/ui/checkbox";
import {Color} from "@/types/color";
import {ColumnDef} from "@tanstack/react-table";
import Actions from "./actions";
import Image from "next/image";
import React from "react";

export const columns: ColumnDef<Color>[] = [
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
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Code"/>
        ),
        cell: ({row}) => {
            const name = row.getValue("name") as string;
            return (
                <div className="flex items-center space-x-2">
                    {/* Hiển thị ô màu */}
                    <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                            backgroundColor: name,
                        }}
                    ></span>
                    {/* Hiển thị tên màu */}
                    <span>{name}</span>
                </div>
            );
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
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        },
    },
    {
        accessorKey: "isDeleted",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Is Deleted"/>
        ),
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
];
