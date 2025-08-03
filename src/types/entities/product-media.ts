import {BaseEntity} from "./base/base";
import {Product} from "./product";
import {MediaFile} from "./media-file";

export interface ProductMedia extends BaseEntity {
    productId?: string | null | undefined;
    photoId?: string | null | undefined;
    product?: Product | null | undefined;
    photo?: MediaFile | null | undefined;
}
