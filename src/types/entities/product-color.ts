import {BaseEntity} from "./base/base";
import {Product} from "./product";
import {Color} from "./color";

export interface ProductColor extends BaseEntity {
    productId?: string | null;
    colorId?: string | null;
    isActive: boolean;
    product?: Product | null;
    color?: Color | null;
}
