"use client";

import { DataTableColumnHeader } from "@/components/_common/data-table-generic/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Product, ProductStatus } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

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
import { productService } from "@/services/product-service";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "subCategory.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SubCategory" />
    ),
  },
  // {
  //   accessorKey: "size.name",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Size" />
  //   ),
  // },
  // {
  //   accessorKey: "color.name",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Color" />
  //   ),
  // },
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  // {
  //     accessorKey: "totalSlots",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="totalSlots"/>
  //     ),
  //     cell: ({row}) => {
  //         const amount = parseFloat(row.getValue("totalSlots"));

  //         return <div className="font-medium">{amount}</div>;
  //     },
  // },
  // {
  //     accessorKey: "totalSessions",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="totalSessions"/>
  //     ),
  //     cell: ({row}) => {
  //         const amount = parseFloat(row.getValue("totalSessions"));

  //         return <div className="font-medium">{amount}</div>;
  //     },
  // },
  // {
  //     accessorKey: "startTime",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="Start Time"/>
  //     ),
  //     cell: ({row}) => {
  //         const timeSpan = row.getValue('startTime') as string;
  //         console.log("check_time", timeSpan)
  //         if (timeSpan) {
  //             const [hours, minutes] = timeSpan.split(':'); // Tách giờ và phút
  //             const ampm = parseInt(hours) < 12 ? 'AM' : 'PM'; // Xác định AM hoặc PM

  //             const formattedTime = `${hours}:${minutes} ${ampm}`; // Định dạng đẹp

  //             return <span>{formattedTime}</span>;
  //         }
  //         return <span>N/A</span>;
  //     },
  // },
  // {
  //     accessorKey: "endTime",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="End Time"/>
  //     ),
  //     cell: ({row}) => {
  //         const timeSpan = row.getValue('endTime') as string;

  //         if (timeSpan) {
  //             const [hours, minutes] = timeSpan.split(':'); // Tách giờ và phút
  //             const ampm = parseInt(hours) < 12 ? 'AM' : 'PM'; // Xác định AM hoặc PM

  //             const formattedTime = `${hours}:${minutes} ${ampm}`; // Định dạng đẹp

  //             return <span>{formattedTime}</span>;
  //         }
  //         return <span>N/A</span>;
  //     },
  // },
  // {
  //     accessorKey: "startDate",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="Start learning"/>
  //     ),
  //     cell: ({row}) => {
  //         const date = new Date(row.getValue("startDate"));
  //         return date.toLocaleDateString("en-US", {
  //             weekday: "short",
  //             year: "numeric",
  //             month: "short",
  //             day: "numeric",
  //         });
  //     },
  // },
  // {
  //     accessorKey: "endDate",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="End learning"/>
  //     ),
  //     cell: ({row}) => {
  //         const date = new Date(row.getValue("endDate"));
  //         return date.toLocaleDateString("en-US", {
  //             weekday: "short",
  //             year: "numeric",
  //             month: "short",
  //             day: "numeric",
  //         });
  //     },
  // },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdDate"));
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  // {
  //     accessorKey: "type",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="Type"/>
  //     ),
  //     cell: ({row}) => {
  //         const status = row.getValue("type") as ProductType;
  //         const statusText = ProductType[status];

  //         let badgeVariant:
  //             | "secondary"
  //             | "destructive"
  //             | "default"
  //             | "outline"
  //             | null = "default";

  //         switch (status) {
  //             case ProductType.Online:
  //                 badgeVariant = "outline";
  //                 break;
  //             case ProductType.Offline:
  //                 badgeVariant = "outline";
  //                 break;
  //             default:
  //                 badgeVariant = "default";
  //         }

  //         return <Badge variant={badgeVariant}>{statusText}</Badge>;
  //     },
  //     filterFn: (row, id, value) => {
  //         return value.includes(row.getValue(id));
  //     },
  // },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as ProductStatus;
      const statusText = ProductStatus[status];

      let badgeVariant:
        | "secondary"
        | "destructive"
        | "default"
        | "outline"
        | null = "default";

      switch (status) {
        case ProductStatus.InMaintenance:
          badgeVariant = "secondary";
          break;
        case ProductStatus.Available:
          badgeVariant = "default";
          break;
        case ProductStatus.Discontinued:
          badgeVariant = "destructive";
          break;
        default:
          badgeVariant = "outline";
      }

      return <Badge variant={badgeVariant}>{statusText}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //     accessorKey: "isActive",
  //     header: ({column}) => (
  //         <DataTableColumnHeader column={column} title="Is Active"/>
  //     ),
  //     cell: ({row}) => {
  //         const isActive = row.getValue("isActive") as boolean;
  //         if (isActive) {
  //             return <Badge variant="default">Displaying</Badge>;
  //         }
  //         return <Badge variant="secondary">Not show</Badge>;
  //     },
  //     filterFn: (row, id, value) => {
  //         return value.includes(row.getValue(id));
  //     },
  // },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Deleted" />
    ),
    cell: ({ row }) => {
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

interface ActionsProps {
  row: Row<Product>;
}

const Actions: React.FC<ActionsProps> = ({ row }) => {
  const model = row.original;
  const router = useRouter();
  const pathName = usePathname();
  const handleEditClick = () => {
    router.push(`${pathName}/${model.id}`);
  };

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  const handleProductsClick = () => {
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
          <DropdownMenuItem onClick={handleProductsClick}>
            View features
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
        deleteById={productService.delete}
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        list={[model]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
    </>
  );
};
