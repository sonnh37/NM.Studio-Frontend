import { BaseEntity } from "./base/base";
import { Category } from "./category";
import { Product } from "./product";

export interface SubCategory extends BaseEntity {
  name?: string;
  slug?: string;
  description?: string;
  isFeatured: boolean;
  categoryId?: string;
  category?: Category;
}