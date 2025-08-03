import {BaseEntity} from "./base/base";
import {Product} from "./product";
import {Size} from "./size";

export interface ProductSize extends BaseEntity {
    productId?: string | null | undefined;
    sizeId?: string | null | undefined;
    isActive: boolean;
    product?: Product | null | undefined;
    size?: Size | null | undefined;
}
