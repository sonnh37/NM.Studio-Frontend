"use client";

import { DataTableColumnHeader } from "@/components/_common/data-table-generic/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SubCategory } from "@/types/entities/subcategory";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SubCategory-name" />
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="truncate max-w-xs">{row.getValue("description")}</div>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Featured" />
    ),
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured") as boolean;
      if (!isFeatured) {
        return <Badge variant="outline">In album</Badge>;
      }
      return <Badge>In home page</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category ID" />
    ),
  },
  {
    id: "createdDate",
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data created" />
    ),
    cell: ({ row }) => {
      if (!row.original.createdDate) return "-";
      return formatDate(row.original.createdDate);
    },
  },
  {
    accessorKey: "isDeleted",
    header: () => null,
    cell: () => null,
    enableHiding: false,
  },
];
