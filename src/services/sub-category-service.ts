import {SubCategory} from "@/types/category";
import {BaseService} from "./base-service";
import {Const} from "@/lib/constants/const";

class SubCategoryService extends BaseService<SubCategory> {
    constructor() {
        super(`${Const.SUBCATEGORY}`);
    }
}

export const subCategoryService = new SubCategoryService();
