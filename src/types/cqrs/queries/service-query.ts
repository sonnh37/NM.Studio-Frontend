import { GetQueryableQuery } from "./base/base-query";

export interface ServiceGetAllQuery extends GetQueryableQuery {
  name?: string | null;
}
