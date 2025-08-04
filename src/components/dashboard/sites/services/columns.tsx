"use client";

import { DataTableColumnHeader } from "@/components/dashboard/common/data-table/data-table-column-header";
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
    accessorKey: "src",
    header: "Src Image",
    cell: ({ row }) => {
      const backgroundUrl = row.getValue("src") as string;
      return (
        <Link href={backgroundUrl ?? ""}>
          <Image
            alt="Service background"
            className="aspect-square size-[64px] rounded-md object-cover"
            height={64}
            width={64}
            src={backgroundUrl ?? "/image-notfound.jpg"}
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
    accessorKey: "shortDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Description" />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-xs">
        {row.getValue("shortDescription")}
      </div>
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => (row.getValue("isFeatured") ? "Yes" : "No"),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => (row.getValue("isActive") ? "Yes" : "No"),
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sort Order" />
    ),
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image URL" />
    ),
    cell: ({ row }) => {
      const url = row.getValue("imageUrl") as string;
      return url ? (
        <Link href={url} className="text-blue-600 underline" target="_blank">
          Link
        </Link>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "metaTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meta Title" />
    ),
  },
  {
    accessorKey: "metaDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meta Description" />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-xs">{row.getValue("metaDescription")}</div>
    ),
  },
  {
    accessorKey: "metaKeywords",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meta Keywords" />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-xs">{row.getValue("metaKeywords")}</div>
    ),
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
    accessorKey: "maxBookingsPerDay",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Bookings/Day" />
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
