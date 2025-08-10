import { BaseEntity } from "./base/base";
import { Product } from "./product";
import { Size } from "./size";

export interface ProductSize extends BaseEntity {
  productId?: string;
  sizeId?: string;
  isActive: boolean;
  product?: Product;
  size?: Size;
}
