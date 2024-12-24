import {ProductStatus} from "../product";
import {BaseQueryableQuery} from "./base-query";

export interface ProductGetAllQuery extends BaseQueryableQuery {
    sku?: string | null | undefined;
    slug?: string | null | undefined;
    subCategoryId?: string | null | undefined;
    name?: string | null | undefined;
    price?: number | null | undefined;
    description?: string | null | undefined;
    status?: ProductStatus | null | undefined;

    categoryName?: string | null | undefined;
    subCategoryName?: string | null | undefined;
    sizes?: string[];
    colors?: string[];
}
