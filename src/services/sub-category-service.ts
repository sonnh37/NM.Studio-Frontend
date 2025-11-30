import { SubCategory } from "@/types/entities/subcategory";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";

class SubCategoryService extends BaseService<SubCategory> {
    constructor() {
        super(`${Constants.SUBCATEGORIES}`);
    }
}

export const subCategoryService = new SubCategoryService();
