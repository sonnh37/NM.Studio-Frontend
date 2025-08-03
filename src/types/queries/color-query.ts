import {GetQueryableQuery} from "./base/base-query";

export interface ColorGetAllQuery extends GetQueryableQuery {
    name?: string | null | undefined;
    productId?: string | null | undefined;
}