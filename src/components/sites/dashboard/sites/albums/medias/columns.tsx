"use client";

import { DataTableColumnHeader } from "@/components/_common/data-table-generic/data-table-column-header";
import { formatDate } from "@/lib/utils";
import { MediaBase } from "@/types/entities/media-base";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<MediaBase>[] = [
  {
    accessorKey: "mediaUrl",
    header: "Src Image",
    cell: ({ row }) => {
      const backgroundUrl = row.original.mediaUrl;
      if (!backgroundUrl) return "-";
      return (
        <Link href={backgroundUrl}>
          <Image
            alt={`Photo background`}
            className="aspect-square rounded-md object-cover"
            height={9999}
            width={9999}
            src={backgroundUrl}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display name" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "mimeType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="mimeType" />
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="size" />
    ),
  },
  {
    accessorKey: "width",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="width" />
    ),
  },
  {
    accessorKey: "height",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="height" />
    ),
  },
  {
    accessorKey: "createdMediaBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    accessorKey: "takenMediaDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Taken Date" />
    ),
    cell: ({ row }) => {
      if (!row.original.takenMediaDate) return "-";
      return formatDate(row.original.takenMediaDate);
    },
  },
  {
    accessorKey: "mediaBaseType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      if (!row.original.createdDate) return "-";
      return formatDate(row.original.createdDate);
    },
  },
];
