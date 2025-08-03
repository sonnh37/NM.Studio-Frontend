import {GetQueryableQuery} from "./base/base-query";

export interface SizeGetAllQuery extends GetQueryableQuery {
    name?: string | null | undefined;
    productId?: string | null | undefined;
}