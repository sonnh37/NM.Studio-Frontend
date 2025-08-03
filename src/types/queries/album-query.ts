import {GetQueryableQuery} from "./base/base-query";

export interface AlbumGetAllQuery extends GetQueryableQuery {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    background?: string | null | undefined;
}
