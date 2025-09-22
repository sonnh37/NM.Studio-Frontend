import { BaseEntity } from "./base/base";
import { Category, SubCategory } from "./category";
import { ProductVariant } from "./product-variant";

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

export interface Product extends BaseEntity {
  sku?: string;
  name: string;
  slug?: string;
  categoryId?: string;
  subCategoryId?: string;
  description?: string;
  material?: string;
  status: ProductStatus;

  category?: Category;
  subCategory?: SubCategory;
  variants: ProductVariant[];
}
