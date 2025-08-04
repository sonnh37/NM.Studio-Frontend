import {GetQueryableQuery} from "./base/base-query";

export interface CategoryGetAllQuery extends GetQueryableQuery {
    name?: string | null;
}

export interface SubCategoryGetAllQuery extends GetQueryableQuery {
    name?: string | null;
    categoryId?: string | null;
    isNullCategoryId?: boolean | null;
}