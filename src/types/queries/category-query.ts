import {GetQueryableQuery} from "./base/base-query";

export interface CategoryGetAllQuery extends GetQueryableQuery {
    name?: string | null | undefined;
}

export interface SubCategoryGetAllQuery extends GetQueryableQuery {
    name?: string | null | undefined;
    categoryId?: string | null | undefined;
    isNullCategoryId?: boolean | null | undefined;
}