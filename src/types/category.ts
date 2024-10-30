import { BaseEntity } from "./base";
import { Product } from "./product";

export interface Category extends BaseEntity {
    name?: string;
    products: Product[];
    categories: SubCategory[];
}

export interface SubCategory extends BaseEntity {
    name?: string;
    categoryId?: string;
    category: Category;
}