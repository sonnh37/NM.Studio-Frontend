import {BaseEntity} from "./base";
import {Product} from "./product";
import { ProductXColor } from "./product-x-color";

export interface Color extends BaseEntity {
    name?: string | null | undefined;
    productXColors: ProductXColor[];
}