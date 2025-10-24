import { GetQueryableQuery } from "./base/base-query";

export interface BlogGetAllQuery extends GetQueryableQuery {
  slug?: string | null;
}
