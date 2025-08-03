import {GetQueryableQuery} from "./base/base-query";

export interface BlogGetAllQuery extends GetQueryableQuery {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    content?: string | null | undefined;
    isFeatured?: boolean;
    thumbnail?: string | null | undefined;
}