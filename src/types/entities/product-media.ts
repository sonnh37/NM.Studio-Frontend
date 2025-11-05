import { BaseEntity } from "./base/base";
import { Product } from "./product";
import { ProductVariant } from "./product-variant";
import { MediaBase } from "./media-base";

export interface ProductMedia extends BaseEntity {
  mediaBaseId?: string;
  productVariantId?: string;
  productVariant?: ProductVariant;
  mediaBase?: MediaBase;
}
