"use client";

import { DataTableColumnHeader } from "@/components/sites/dashboard/common/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { homeSlideService } from "@/services/home-slide-service";
import { HomeSlide } from "@/types/entities/home-slide";
export const columns: ColumnDef<HomeSlide>[] = [
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
    accessorKey: "slide.mediaUrl",
    header: "Media Url",
    cell: ({ row }) => {
      const backgroundUrl = row.original.slide?.mediaUrl;
      return (
        <Link href={backgroundUrl ?? ""}>
          <Image
            alt={`Media`}
            fill
            className="aspect-auto rounded-md object-cover"
            src={backgroundUrl ?? "/image-notfound.png"}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Order" />
    ),
  },
  {
    accessorKey: "slide.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "slide.displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Name" />
    ),
  },
  {
    accessorKey: "slide.mimeType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MimeType" />
    ),
  },
  {
    accessorKey: "slide.size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
  },
  {
    accessorKey: "slide.width",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Width" />
    ),
  },
  {
    accessorKey: "slide.height",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Height" />
    ),
  },
  {
    accessorKey: "slide.createdMediaBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
  },
  {
    accessorKey: "slide.takenMediaDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pic Date" />
    ),
  },
  {
    accessorKey: "slide.homeSlideType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.original.slide?.mediaBaseType;
      switch (type) {
        case 0:
          return <Badge>Image</Badge>;
        case 1:
          return <Badge>Video</Badge>;
        default:
          return <Badge>Unknown</Badge>;
      }
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
  row: Row<HomeSlide>;
}

const Actions: React.FC<ActionsProps> = ({ row }) => {
  const model = row.original;
  const router = useRouter();
  const pathName = usePathname();
  const handleEditClick = () => {
    router.push(`/dashboard/media-files/home-slides/${model.id}`);
  };

  const handleDeleteClick = async () => {};
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);

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
          {/*<DropdownMenuItem onClick={handleHomeSlidesClick}>*/}
          {/*    View photos*/}
          {/*</DropdownMenuItem>*/}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBaseEntitysDialog
        deleteFunc={(command) => homeSlideService.delete(command)}
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        list={[model]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
    </>
  );
};
