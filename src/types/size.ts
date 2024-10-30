import { BaseEntity } from "./base";
import { Product } from "./product";

export interface Size extends BaseEntity {
    name?: string;
    products: Product[];
}