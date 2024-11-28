import {BaseQueryableQuery} from "./base-query";

export interface PhotoGetAllQuery extends BaseQueryableQuery {
    title?: string;
    description?: string;
    isFeatured: boolean;
    src?: string;
    href?: string;
    tag?: string;
    albumId?: string;
    productId?: string;
}