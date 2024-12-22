import {BaseQueryableQuery} from "./base-query";

export interface SizeGetAllQuery extends BaseQueryableQuery {
    name?: string | null | undefined;
    productId?: string | null | undefined;
}