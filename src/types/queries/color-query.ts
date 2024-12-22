import {BaseQueryableQuery} from "./base-query";

export interface ColorGetAllQuery extends BaseQueryableQuery {
    name?: string | null | undefined;
    productId?: string | null | undefined;
}