import { BaseEntity } from "./base/base";
import { ProductStatus, Product } from "./product";
import { ProductMedia } from "./product-media";

export interface ProductVariant extends BaseEntity {
  productId?: string;
  sku?: string;
  color?: string;
  size?: string;
  price?: number;
  rentalPrice?: number;
  deposit?: number;
  stockQuantity: number;
  stockDefaultQuantity: number;
  status: InventoryStatus;
  product?: Product;
  productMedias: ProductMedia[];
}

export enum InventoryStatus {
  Available,
  Rented,
  InMaintenance,
}
