import { SubCategory } from "@/types/entities/subcategory";
import { GetQueryableQuery } from "./base/base-query";
import { ProductStatus } from "@/types/entities/product";

export interface ProductGetAllQuery extends GetQueryableQuery {
  sku?: string | null;
  slug?: string | null;
  name?: string | null;
  subCategoryId?: string | null;
  subCategory?: SubCategory | null;
  price?: number | null;
  rentalPrice?: number | null;
  deposit?: number | null;
  isRentable?: boolean | null;
  isSaleable?: boolean | null;
  description?: string | null;
  material?: string | null;
  brand?: string | null;
  style?: string | null;
  care?: string | null;
  status?: ProductStatus | null;

  categoryName?: string | null;
  subCategoryName?: string | null;
  sizes?: string[] | null;
  colors?: string[] | null;
}
