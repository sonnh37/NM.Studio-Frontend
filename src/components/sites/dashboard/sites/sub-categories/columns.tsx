"use client";

import { DataTableColumnHeader } from "@/components/_common/data-table-generic/data-table-column-header";
import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
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
import { subCategoryService } from "@/services/sub-category-service";
import { SubCategory } from "@/types/entities/subcategory";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {formatDate} from "@/lib/utils/date-utils";
export const columns: ColumnDef<SubCategory>[] = [
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
  row: Row<SubCategory>;
}

const Actions: React.FC<ActionsProps> = ({ row }) => {
  const model = row.original;
  const router = useRouter();
  const pathName = usePathname();
  const handleEditClick = () => {
    router.push(`${pathName}/${model.id}`);
  };

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  const handleSubCategorysClick = () => {
    //row.toggleSelected();
    router.push(`${pathName}?q=${model.id}`);
  };

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
          <DropdownMenuItem onClick={handleSubCategorysClick}>
            View photos
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
        deleteFunc={subCategoryService.delete}
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        list={[model]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
    </>
  );
};
