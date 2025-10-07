import { GetQueryableQuery } from "./base/base-query";

export interface ProductVariantGetAllQuery extends GetQueryableQuery {
  productId?: string | null | undefined;
  colorId?: string | null | undefined;
  isActive?: boolean | null | undefined;
}
