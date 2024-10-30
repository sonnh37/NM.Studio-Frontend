import {BaseQueryableQuery} from "./base-query";

export interface ProductGetAllQuery extends BaseQueryableQuery {
    sku?: string;
    categoryId?: string;
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
    categoryName?: string;
}

export interface CategoryGetAllQuery extends BaseQueryableQuery {
    name?: string;
}