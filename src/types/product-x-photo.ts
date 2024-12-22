import {BaseEntity} from "./base";
import {Product} from "./product";
import {Photo} from "./photo";

export interface ProductXPhoto extends BaseEntity {
    productId?: string | null | undefined;
    photoId?: string | null | undefined;
    product?: Product | null | undefined;
    photo?: Photo | null | undefined;
}
