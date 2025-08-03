import {GetQueryableQuery} from "./base/base-query";

export interface ProductSizeGetAllQuery extends GetQueryableQuery {
    productId?: string | null | undefined;
    sizeId?: string | null | undefined;
    isActive?: boolean;
}
