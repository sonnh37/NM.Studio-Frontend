import {Category} from "@/types/entities/category";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class CategoryService extends BaseService<Category> {
    constructor() {
        super(`${Const.CATEGORIES}`);
    }
}

export const categoryService = new CategoryService();
