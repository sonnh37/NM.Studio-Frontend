import { BaseEntity } from "./base";
import { Category, SubCategory } from "./category";
import { ProductXColor } from "./product-x-color";
import { ProductXPhoto } from "./product-x-photo";
import { ProductXSize } from "./product-x-size";

export interface Product extends BaseEntity {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  subCategoryId?: string | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  description?: string | null | undefined;
  subCategory?: SubCategory | null | undefined;
  status: ProductStatus | null | undefined;
  productXPhotos?: ProductXPhoto[];
  productXColors?: ProductXColor[];
  productXSizes?: ProductXSize[];
}

export interface ProductRepresentativeByCategory {
  category?: Category | null | undefined;
  product?: ProductRepresentative | null | undefined;
}

export interface ProductRepresentative {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  src?: string | null | undefined;
}

export enum ProductStatus {
  Unspecified,
  Available,
  Rented,
  InMaintenance,
  Discontinued,
}
