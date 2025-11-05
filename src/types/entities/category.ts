import { BaseEntity } from "./base/base";
import { Product } from "./product";
import { SubCategory } from "./subcategory";
export interface Category extends BaseEntity {
  name?: string;
  slug?: string;
  description?: string;
  isFeatured: boolean;
  subCategories: SubCategory[];
}
