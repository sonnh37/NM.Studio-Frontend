import { BaseEntity } from "./base/base";
import { ProductSize } from "./product-size";

export interface Size extends BaseEntity {
  name?: string;
  displayName?: string;
  description?: string;
  bust?: number;
  waist?: number;
  hip?: number;
  length?: number;
  sizeGuide?: string;
  isActive: boolean;
  sortOrder: number;
  productSizes: ProductSize[];
}
