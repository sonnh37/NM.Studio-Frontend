import {BaseQueryableQuery} from "./base-query";

export interface ServiceGetAllQuery extends BaseQueryableQuery {
    name?: string | null | undefined;
    description?: string | null | undefined;
    src?: string | null | undefined;
    slug?: string | null | undefined;
    price?: number | null | undefined;
}