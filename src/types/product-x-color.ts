import {BaseEntity} from "./base";
import {Product} from "./product";
import {Color} from "./color";

export interface ProductXColor extends BaseEntity {
    productId?: string | null | undefined;
    colorId?: string | null | undefined;
    isActive: boolean;
    product?: Product | null | undefined;
    color?: Color | null | undefined;
}
