import {BaseQueryableQuery} from "./base-query";

export interface AlbumGetAllQuery extends BaseQueryableQuery {
    title?: string;
    slug?: string;
    description?: string;
    background?: string;
    isNotNullSlug: boolean;
}