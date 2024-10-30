import { Category } from "@/types/category";
import { BaseService } from "./base-service";

class CategoryService extends BaseService<Category> {
    constructor() {
        super(`${process.env.NEXT_PUBLIC_API_BASE}/categories`);
    }
}

export const categoryService = new CategoryService();
