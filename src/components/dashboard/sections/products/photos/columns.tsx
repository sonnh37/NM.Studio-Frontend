"use client";

import {DataTableColumnHeader} from "@/components/common/data-table-generic/data-table-column-header";
import {Photo} from "@/types/photo";
import {ColumnDef} from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const columns: ColumnDef<Photo>[] = [
    {
        accessorKey: "src",
        header: "Src Image",
        cell: ({row}) => {
            const backgroundUrl = row.getValue("src") as string;
            return (
                <Link href={backgroundUrl}>
                    <Image
                        alt={`Photo background`}
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        width={64}
                        src={backgroundUrl}
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Title"/>
        ),
    },
    {
        accessorKey: "href",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Href link to"/>
        ),
    },
    {
        accessorKey: "tag",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tag"/>
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
