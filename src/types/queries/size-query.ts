import { GetQueryableQuery } from "./base/base-query";

export interface SizeGetAllQuery extends GetQueryableQuery {
  name?: string | null | undefined;
  displayName?: string | null | undefined;
  description?: string | null | undefined;
  bust?: number | null | undefined;
  waist?: number | null | undefined;
  hip?: number | null | undefined;
  length?: number | null | undefined;
  sizeGuide?: string | null | undefined;
  isActive?: boolean | null | undefined;
  sortOrder?: number | null | undefined;
  productId?: string | null | undefined;
}
