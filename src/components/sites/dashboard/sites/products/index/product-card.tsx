import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Const } from "@/lib/constants/const";
import { calculateStock, cn } from "@/lib/utils";
import { ProductPreview, ProductStatus } from "@/types/entities/product";
import Link from "next/link";
import { Actions } from "./actions";
import { ChevronRight } from "lucide-react";

type ProductCardProps = {
  product: ProductPreview;
};

export function ProductCard({ product }: ProductCardProps) {
  const { stock, stockLevel } = calculateStock(
    product.totalStockDefaultQuantity,
    product.totalStockQuantity
  );

  const status = getProductStatusDisplay(product.status);
  return (
    <Card className="shadow-xs hover:shadow-2xl transition">
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2 h-fit">
            <div>
              <img
                src={product.thumbnail?.mediaUrl ?? Const.IMAGE_DEFAULT_URL}
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
