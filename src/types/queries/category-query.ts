import { GetQueryableQuery } from "./base/base-query";

export interface CategoryGetAllQuery extends GetQueryableQuery {
  name?: string | null | undefined;
  displayName?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  shortDescription?: string | null | undefined;
  iconUrl?: string | null | undefined;
  imageUrl?: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  isActive?: boolean | null | undefined;
  isFeatured?: boolean | null | undefined;
  sortOrder?: number | null | undefined;
}

export interface SubCategoryGetAllQuery extends GetQueryableQuery {
  name?: string | null | undefined;
  displayName?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  shortDescription?: string | null | undefined;
  imageUrl?: string | null | undefined;
  isActive?: boolean | null | undefined;
  sortOrder?: number | null | undefined;
  metaTitle?: string | null | undefined;
  metaDescription?: string | null | undefined;
  isFeatured?: boolean | null | undefined;
  categoryId?: string | null | undefined;
  isNullCategoryId?: boolean | null | undefined;
}
