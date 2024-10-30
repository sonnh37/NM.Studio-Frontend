import { BaseEntity } from "./base";
import { Product } from "./product";
import { Photo } from "./photo";

export interface ProductXPhoto extends BaseEntity {
    productId?: string;
    photoId?: string;
    product?: Product;
    photo?: Photo;
}
