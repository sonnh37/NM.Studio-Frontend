"use client";

import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { DataTableColumnHeader } from "@/components/sites/dashboard/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { mediaBaseService } from "@/services/image-service";
import { MediaCategory, MediaBase, MediaType } from "@/types/entities/media-file";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
export const columns: ColumnDef<MediaBase>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "src",
    header: "Src Image",
    cell: ({ row }) => {
      const srcUrl = row.getValue("src") as string;
      return (
        <Link href={srcUrl || "#"}>
          <Image
            alt={`Photo src`}
            className="aspect-square rounded-md object-cover"
            height={64}
            width={64}
            src={srcUrl ?? ""}
          />
        </Link>
      );
    },
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
    accessorKey: "altText",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alt Text" />
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
    accessorKey: "href",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link to" />
    ),
  },
  {
    accessorKey: "tag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => MediaCategory[row.original.category].toString() ?? "-",
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => MediaType[row.original.type].toString() ?? "-",
  },
  {
    accessorKey: "isWatermarked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Watermarked" />
    ),
    cell: ({ row }) => (row.getValue("isWatermarked") ? "Yes" : "No"),
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
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Active" />
    ),
    cell: ({ row }) => (row.getValue("isActive") ? "Active" : "Inactive"),
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
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
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

interface ActionsProps {
  row: Row<MediaBase>;
}

const Actions: React.FC<ActionsProps> = ({ row }) => {
  const model = row.original;
  const router = useRouter();
  const pathName = usePathname();
  const handleEditClick = () => {
    router.push(`${pathName}/${model.id}`);
  };

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(model.id!)}
          >
            Copy model ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBaseEntitysDialog
        deleteFunc={mediaBaseService.delete}
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        list={[model]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
    </>
  );
};
