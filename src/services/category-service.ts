import {Category} from "@/types/entities/category";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class CategoryService extends BaseService<Category> {
    constructor() {
        super(`${Constants.CATEGORIES}`);
    }
}

export const categoryService = new CategoryService();
