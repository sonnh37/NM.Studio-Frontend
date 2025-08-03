import {GetQueryableQuery} from "./base/base-query";

export interface ProductColorGetAllQuery extends GetQueryableQuery {
    productId?: string | null | undefined;
    colorId?: string | null | undefined;
    isActive?: boolean;
}
