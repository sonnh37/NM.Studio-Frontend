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
import { ProductPreview } from "@/types/entities/product";
import { Eye, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
interface ActionsProps {
  product: ProductPreview;
}

export const Actions: React.FC<ActionsProps> = ({ product }) => {
  const model = product;
  const router = useRouter();
  const pathName = usePathname();
  const handleEditClick = () => {
    router.push(`${pathName}/${model.id}/edit`);
  };

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  const handleProductsClick = () => {
    //row.toggleSelected();
    router.push(`${pathName}/${model.id}`);
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
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(model.id!)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProductsClick}>
            <Eye /> View
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled
            onSelect={() => setShowDeleteTaskDialog(true)}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
