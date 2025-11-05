import { GetQueryableQuery } from "./base/base-query";

export interface CategoryGetAllQuery extends GetQueryableQuery {
  name?: string | null;
  isNullCategoryId?: boolean | null;
}

export interface SubCategoryGetAllQuery extends GetQueryableQuery {
  name?: string | null;
  isNullCategoryId?: boolean | null;
}
