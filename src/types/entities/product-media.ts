import { BaseEntity } from "./base/base";
import { Product } from "./product";
import { MediaFile } from "./media-file";

export interface ProductMedia extends BaseEntity {
  productId?: string;
  mediaFileId?: string;
  product?: Product;
  mediaFile?: MediaFile;
}
