import {BaseEntity} from "./base";
import {Product} from "./product";
import { ProductXSize } from "./product-x-size";

export interface Size extends BaseEntity {
    name?: string | null | undefined;
    productXSizes: ProductXSize[];
}