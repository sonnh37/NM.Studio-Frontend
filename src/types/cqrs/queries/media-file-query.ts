import { GetQueryableQuery } from "./base/base-query";


export interface MediaBaseGetAllQuery extends GetQueryableQuery {
  albumId?: string | null | undefined;
  productId?: string | null | undefined;
}
