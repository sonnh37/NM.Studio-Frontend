import {BaseEntity} from "./base";
import {ProductXSize} from "./product-x-size";

export interface Size extends BaseEntity {
    name?: string | null | undefined;
    productXSizes: ProductXSize[];
}