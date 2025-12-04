import { BaseEntity } from "./base/base";
import { Category } from "./category";
import { MediaBase } from "./media-base";
import { ProductVariant } from "./product-variant";
import { SubCategory } from "./subcategory";

export interface ProductRepresentativeByCategory {
  category?: Category | null;
  product?: ProductRepresentative | null;
}

export interface ProductRepresentative {
  sku?: string | null;
  slug?: string | null;
  src?: string | null;
}

export enum ProductStatus {
  Active,
  Draft,
  Archived,
}

export interface Product extends BaseEntity {
  sku?: string;
  name: string;
  slug?: string;
  categoryId?: string;
  subCategoryId?: string;
  thumbnailId?: string;
  description?: string;
  material?: string;
  status: ProductStatus;

  category?: Category;
  subCategory?: SubCategory;
  thumbnail?: MediaBase;
  variants: ProductVariant[];
}

export interface ProductPreview extends BaseEntity {
  sku?: string;
  name: string;
  slug?: string;
  categoryId?: string;
  subCategoryId?: string;
  thumbnailId?: string;
  description?: string;
  material?: string;
  status: ProductStatus;

  minPrice: number;
  maxPrice: number;
  totalStockDefaultQuantity: number;
  totalStockQuantity: number;

  category?: Category;
  subCategory?: SubCategory;
  thumbnail?: MediaBase;
  variants: ProductVariant[];
}
