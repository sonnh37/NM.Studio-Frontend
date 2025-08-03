import {SubCategory} from "@/types/entities/category";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class SubCategoryService extends BaseService<SubCategory> {
    constructor() {
        super(`${Const.SUBCATEGORIES}`);
    }
}

export const subCategoryService = new SubCategoryService();
