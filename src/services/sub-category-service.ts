import { Category, SubCategory } from "@/types/category";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";

class SubCategoryService extends BaseService<SubCategory> {
    constructor() {
        super(`${Const.SUBCATEGORY}`);
    }
}

export const subCategoryService = new SubCategoryService();
