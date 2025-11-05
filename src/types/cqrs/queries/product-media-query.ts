import { GetQueryableQuery } from "./base/base-query";

export interface ProductMediaGetAllQuery extends GetQueryableQuery {
  productId?: string | null | undefined;
  photoId?: string | null | undefined;
}
