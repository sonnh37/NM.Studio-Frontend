"use client";

import { DataTableColumnHeader } from "@/components/_common/data-table-generic/data-table-column-header";
import { formatDate } from "@/lib/utils";
import { MediaFile } from "@/types/entities/media-file";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<MediaFile>[] = [
  {
    accessorKey: "src",
    header: "Src Image",
    cell: ({ row }) => {
      const backgroundUrl = row.original.src;
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
    accessorKey: "href",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Href link to" />
    ),
  },
  {
    accessorKey: "tag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "displayTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "altText",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alt Text" />
    ),
  },
  {
    accessorKey: "thumbnailSrc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail Src" />
    ),
  },
  {
    accessorKey: "mediumSrc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Medium Src" />
    ),
  },
  {
    accessorKey: "largeSrc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Large Src" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "mimeType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MIME Type" />
    ),
  },
  {
    accessorKey: "fileSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Size" />
    ),
  },
  {
    accessorKey: "width",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Width" />
    ),
  },
  {
    accessorKey: "height",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Height" />
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
  },
  {
    accessorKey: "resolution",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolution" />
    ),
  },
  {
    accessorKey: "format",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Format" />
    ),
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Featured" />
    ),
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sort Order" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Active" />
    ),
  },
  {
    accessorKey: "isWatermarked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Watermarked" />
    ),
  },
  {
    accessorKey: "copyright",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Copyright" />
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
    accessorKey: "location",
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
