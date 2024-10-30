import {BaseQueryableQuery} from "./base-query";

export interface ProductGetAllQuery extends BaseQueryableQuery {
    sku?: string;
    categoryId?: string; // Guid trong TypeScript thường được biểu diễn bằng string
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
}

export interface CategoryGetAllQuery extends BaseQueryableQuery {
    name?: string;
}