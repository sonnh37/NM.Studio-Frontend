import {BaseEntity} from "./base";
import {Product} from "./product";
import {Size} from "./size";

export interface ProductXSize extends BaseEntity {
    productId?: string | null | undefined;
    sizeId?: string | null | undefined;
    isActive: boolean;
    product?: Product | null | undefined;
    size?: Size | null | undefined;
}
