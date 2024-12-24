import {BaseQueryableQuery} from "./base-query";

export interface CategoryGetAllQuery extends BaseQueryableQuery {
    name?: string | null | undefined;
}

export interface SubCategoryGetAllQuery extends BaseQueryableQuery {
    name?: string | null | undefined;
    categoryId?: string | null | undefined;
    isNullCategoryId?: boolean | null | undefined;
}