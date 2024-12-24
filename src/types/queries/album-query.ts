import {BaseQueryableQuery} from "./base-query";

export interface AlbumGetAllQuery extends BaseQueryableQuery {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    background?: string | null | undefined;
}
