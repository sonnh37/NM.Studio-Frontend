"use client";

import { DataTableColumnHeader } from "@/components/sites/dashboard/common/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Service } from "@/types/entities/service";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
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
import { serviceService } from "@/services/service-service";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<Service>[] = [
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
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const backgroundUrl = row.original.thumbnail?.mediaUrl;
      return (
        <Link href={backgroundUrl ?? ""}>
          <Image
            alt={`Blog background`}
            className="aspect-auto size-[64px] rounded-md object-cover"
            height={9999}
            width={9999}
            src={backgroundUrl ?? "/image-notfound.png"}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
    cell: ({ row }) => (
      <div className="truncate max-w-xs">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      if (isNaN(amount)) return "-";
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "backgroundCover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Background" />
    ),
    cell: ({ row }) => {
      const image = row.original.backgroundCover?.mediaUrl;
      return (
        <Link href={image ?? ""}>
          <Image
            alt={`Blog background`}
            className="aspect-auto size-[32px] rounded-md object-cover"
            height={9999}
            width={9999}
            src={image ?? "/image-notfound.png"}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => (row.getValue("isFeatured") ? "Yes" : "No"),
  },
  {
    accessorKey: "termsAndConditions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Terms & Conditions" />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-xs">
        {row.getValue("termsAndConditions")}
      </div>
    ),
  },
  {
    id: "createdDate",
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      if (!row.original.createdDate) return "-";
      return formatDate(row.original.createdDate);
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
    accessorKey: "isDeleted",
    header: () => null,
    cell: () => null,
    enableHiding: false,
  },
];

interface ActionsProps {
  row: Row<Service>;
}

const Actions: React.FC<ActionsProps> = ({ row }) => {
  const model = row.original;
  const router = useRouter();
  const queryClient = useQueryClient();

  const pathName = usePathname();
  const handleEditClick = () => {
    router.push(`${pathName}/${model.id}`);
  };

  const handleDeleteClick = async () => {};
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
          {/*<DropdownMenuItem onClick={handleServicesClick}>*/}
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
        deleteFunc={serviceService.delete}
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        list={[model]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
    </>
  );
};
