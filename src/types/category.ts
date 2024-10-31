import { BaseEntity } from "./base";
import { Product } from "./product";

export interface Category extends BaseEntity {
    name?: string;
    subCategories: SubCategory[];
}

export interface SubCategory extends BaseEntity {
    name?: string;
    categoryId?: string;
    category: Category;
    products: Product[];
}