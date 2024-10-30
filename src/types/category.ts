import { BaseEntity } from "./base";
import { Product } from "./product";

export interface Category extends BaseEntity {
    name?: string;
    products: Product[];
    subCategories: SubCategory[];
}

export interface SubCategory extends BaseEntity {
    name?: string;
    categoryId?: string;
    category: Category;
}