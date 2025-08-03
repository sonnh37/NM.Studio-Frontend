import {GetQueryableQuery} from "./base/base-query";

export interface ServiceGetAllQuery extends GetQueryableQuery {
    name?: string | null | undefined;
    description?: string | null | undefined;
    src?: string | null | undefined;
    slug?: string | null | undefined;
    price?: number | null | undefined;
}