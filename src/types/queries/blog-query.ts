import {BaseQueryableQuery} from "./base-query";

export interface BlogGetAllQuery extends BaseQueryableQuery {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    content?: string | null | undefined;
    isFeatured?: boolean;
    thumbnail?: string | null | undefined;
}