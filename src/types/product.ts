import {BaseEntity} from "./base";
import { Category, SubCategory } from "./category";
import { Color } from "./color";
import { ProductXPhoto } from "./product-x-photo";
import {Photo} from "./photo";
import { Size } from "./size";

export interface Product extends BaseEntity {
    sku?: string;
    subCategoryId?: string;
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
    color?: Color; // Định nghĩa Color nếu cần
    subCategory?: SubCategory;
    size?: Size; // Định nghĩa Size nếu cần
    status: ProductStatus; // Định nghĩa ProductStatus nếu cần
    productXPhotos: ProductXPhoto[];
}


enum ProductStatus {
    Unspecified = 0,
    Available = 1,
    Rented = 2,
    InMaintenance = 3,
    Discontinued = 4
}