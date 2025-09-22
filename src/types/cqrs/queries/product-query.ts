import { SubCategory } from "../entities/category";
import { ProductStatus } from "../entities/product";
import { GetQueryableQuery } from "./base/base-query";

export interface ProductGetAllQuery extends GetQueryableQuery {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  name?: string | null | undefined;
  subCategoryId?: string | null | undefined;
  subCategory?: SubCategory | null | undefined;
  price?: number | null | undefined;
  rentalPrice?: number | null | undefined;
  deposit?: number | null | undefined;
  isRentable?: boolean | null | undefined;
  isSaleable?: boolean | null | undefined;
  description?: string | null | undefined;
  material?: string | null | undefined;
  brand?: string | null | undefined;
  style?: string | null | undefined;
  care?: string | null | undefined;
  status?: ProductStatus | null | undefined;

  categoryName?: string | null | undefined;
  subCategoryName?: string | null | undefined;
  sizes?: string[] | null | undefined;
  colors?: string[] | null | undefined;
}
