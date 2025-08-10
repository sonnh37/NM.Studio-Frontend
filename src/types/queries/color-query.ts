import { GetQueryableQuery } from "./base/base-query";

export interface ColorGetAllQuery extends GetQueryableQuery {
  name?: string | null | undefined;
  colorCode?: string | null | undefined;
  colorType?: string | null | undefined;
  description?: string | null | undefined;
  imagePath?: string | null | undefined;
  isActive?: boolean | null | undefined;
  sortOrder?: number | null | undefined;
  productId?: string | null | undefined;
}
