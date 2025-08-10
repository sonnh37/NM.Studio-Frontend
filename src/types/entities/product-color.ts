import {BaseEntity} from "./base/base";
import {Product} from "./product";
import {Color} from "./color";

export interface ProductColor extends BaseEntity {
    productId?: string;
    colorId?: string;
    isActive: boolean;
    product?: Product;
    color?: Color;
}
