import { BaseQueryableQuery } from "./base-query";

export interface CategoryGetAllQuery extends BaseQueryableQuery {
    name?: string;
}

export interface SubCategoryGetAllQuery extends BaseQueryableQuery {
    name?: string;
    categoryId?: string;
}