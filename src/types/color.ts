import {BaseEntity} from "./base";
import {Product} from "./product";

export interface Color extends BaseEntity {
    name?: string;
    products: Product[];
}