import { Category } from "@/types/category";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";

class CategoryService extends BaseService<Category> {
    constructor() {
        super(`${Const.CATEGORY}`);
    }
}

export const categoryService = new CategoryService();
