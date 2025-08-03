import {BaseEntity} from "./base/base";
import {Product} from "./product";

export interface Category extends BaseEntity{
    name?: string;
    displayName?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    iconUrl?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
    subCategories: SubCategory[];
}
export interface SubCategory extends BaseEntity{
    name?: string;
    displayName?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    imageUrl?: string;
    isActive: boolean;
    sortOrder: number;
    metaTitle?: string;
    metaDescription?: string;
    isFeatured: boolean;
    categoryId?: string;
    category?: Category;
    products: Product[];
}