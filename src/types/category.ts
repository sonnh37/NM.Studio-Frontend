import {BaseEntity} from "./base";
import {Product} from "./product";

export interface Category extends BaseEntity {
    name?: string | null | undefined;
    subCategories?: SubCategory[];
}

export interface SubCategory extends BaseEntity {
    name?: string | null | undefined;
    categoryId?: string | null | undefined;
    category?: Category | null | undefined;
    products?: Product[];
}