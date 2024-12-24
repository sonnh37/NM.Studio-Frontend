import {BaseEntity} from "./base";
import {ProductXColor} from "./product-x-color";

export interface Color extends BaseEntity {
    name?: string | null | undefined;
    productXColors: ProductXColor[];
}