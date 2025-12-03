import { DeleteBaseEntitysDialog } from "@/components/_common/data-table-generic/delete-dialog-generic";
import { DeleteOverlay } from "@/components/_common/delete-overlay";
import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Constants } from "@/lib/constants/constants";
import { calculateStock, cn, processResponse } from "@/lib/utils";
import { productService } from "@/services/product-service";
import {
  ProductDeleteCommand,
  ProductUpdateCommand,
} from "@/types/cqrs/commands/product-command";
import { ProductPreview, ProductStatus } from "@/types/entities/product";
import { Status } from "@/types/models/business-result";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
type ProductCardProps = {
  product: ProductPreview;
};

export function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();
  const { stock, stockLevel } = calculateStock(
    product.totalStockDefaultQuantity,
    product.totalStockQuantity
  );

  const status = getProductStatusDisplay(product.status);
  const isDeleted = product.isDeleted;

  const handleRestore = async () => {
    try {
      const command: ProductUpdateCommand = {
        ...product,
        isDeleted: false,
      };
      const result = await productService.update(command);
      processResponse(result);

      queryClient.refetchQueries({ queryKey: ["products"] });
      toast.success("Restored");
    } catch (error: any) {
      toast.error(error);
      console.log("Error:");
    }
  };

  const handleDeletePermanentFuncly = async () => {
    try {
      const model: ProductDeleteCommand = {
        id: product.id,
        isPermanent: true,
      };
      const result = await productService.delete(model);
      processResponse(result);

      queryClient.refetchQueries({ queryKey: ["products"] });
      toast.success("Deleted");
    } catch (error: any) {
      toast.error(error);
      console.log("Error:");
    }
  };

  return (
    <Card
      className={cn(
        "relative shadow-xs hover:shadow-2xl transition"
        // isDeleted && "opacity-60"
      )}
    >
      {isDeleted && (
        <DeleteOverlay
          onRestore={handleRestore}
          onDelete={handleDeletePermanentFuncly}
        />
      )}

      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2 h-fit">
            <div>
              <img
                src={product.thumbnail?.mediaUrl ?? Constants.IMAGE_DEFAULT_URL}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-between overflow-hidden whitespace-nowrap">
              <Link href={`products/${product.id}`} className="hover:underline">
                <TypographyH4 className=" truncate ">
                  {product.name}
                </TypographyH4>
              </Link>
              <div className="flex items-center gap-x-1">
                <p className="text-xs text-neutral-500">{product.sku}</p>
                <Badge
                  variant={status.variant}
                  className={cn("text-xs", status.className)}
                >
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Actions product={product} />
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm ">
          <div>
            <p className="text-neutral-400 text-xs">Retail</p>
            <p className="font-semibold">
              ${product.minPrice}–${product.maxPrice}
            </p>
          </div>
        </div>

        <div className="flex items-starts text-sm gap-4">
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "px-3 py-1 text-xs rounded-md",
                stockLevel === "High" && "bg-green-100 text-green-700",
                stockLevel === "Medium" && "bg-yellow-100 text-yellow-700",
                stockLevel === "Low" && "bg-red-100 text-red-700"
              )}
            >
              {stock} stock – {stockLevel}
            </Badge>
          </div>

          <div className="text-neutral-600 text-xs flex items-center gap-1">
            Variants ({product.variants.length}) <ChevronRight size={16} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function getProductStatusDisplay(status: ProductStatus) {
  switch (status) {
    case ProductStatus.Active:
      return {
        label: "Active",
        className: "bg-green-100 text-green-700 hover:bg-green-200",
        variant: "default" as const,
      };

    case ProductStatus.Draft:
      return {
        label: "Draft",
        className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        variant: "secondary" as const,
      };

    case ProductStatus.Archived:
      return {
        label: "Archived",
        className: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        variant: "outline" as const,
      };

    default:
      return {
        label: "Unknown",
        className: "bg-neutral-200 text-neutral-700",
        variant: "secondary" as const,
      };
  }
}

interface ActionsProps {
  product: ProductPreview;
}

export const Actions: React.FC<ActionsProps> = ({ product }) => {
  const model = product;
  const router = useRouter();
  const pathName = usePathname();

  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  const handleProductsClick = () => {
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
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleProductsClick}>
            <Eye /> View
          </DropdownMenuItem>

          <DropdownMenuItem
            // disabled
            onSelect={() => setShowDeleteTaskDialog(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteBaseEntitysDialog
        deleteFunc={(command) => productService.delete(command)}
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        list={[model]}
        showTrigger={false}
        query_keys={["products"]}
      />
    </>
  );
};
