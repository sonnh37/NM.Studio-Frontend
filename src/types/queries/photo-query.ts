import {BaseQueryableQuery} from "./base-query";

export interface PhotoGetAllQuery extends BaseQueryableQuery {
    title?: string | null | undefined;
    description?: string | null | undefined;
    isFeatured?: boolean;
    src?: string | null | undefined;
    href?: string | null | undefined;
    tag?: string | null | undefined;
    albumId?: string | null | undefined;
    productId?: string | null | undefined;
}