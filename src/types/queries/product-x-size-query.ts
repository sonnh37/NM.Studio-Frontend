import {BaseQueryableQuery} from "./base-query";

export interface ProductXSizeGetAllQuery extends BaseQueryableQuery {
    productId?: string | null | undefined;
    sizeId?: string | null | undefined;
    isActive?: boolean;
}
