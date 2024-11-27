import {BaseQueryableQuery} from "./base-query";

export interface ServiceGetAllQuery extends BaseQueryableQuery {
    name?: string;
    description?: string;
    src?: string;
    slug?: string;
    isNotNullSlug: boolean;
    price?: number;
}