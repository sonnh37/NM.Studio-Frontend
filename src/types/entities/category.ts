import { BaseEntity } from "./base/base";
import { Product } from "./product";
import { SubCategory } from "./subcategory";
export interface Category extends BaseEntity {
  name?: string;
  slug?: string;
  description?: string;
  sortOrder: number;
  isFeatured: boolean;
  subCategories: SubCategory[];
}
