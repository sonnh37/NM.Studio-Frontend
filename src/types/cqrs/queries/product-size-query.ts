import { GetQueryableQuery } from "./base/base-query";

export interface ProductSizeGetAllQuery extends GetQueryableQuery {
  name?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  src?: string | null | undefined;
  price?: number | null | undefined;
  category?: string | null | undefined;
  isFeatured: boolean | null | undefined;
  isActive?: boolean | null | undefined;
  sortOrder?: number | null | undefined;
  imageUrl?: string | null | undefined;
  shortDescription?: string | null | undefined;
  metaTitle?: string | null | undefined;
  metaDescription?: string | null | undefined;
  metaKeywords?: string | null | undefined;
  termsAndConditions?: string | null | undefined;
  maxBookingsPerDay?: number | null | undefined;

  productId?: string | null | undefined;
  sizeId?: string | null | undefined;
}
