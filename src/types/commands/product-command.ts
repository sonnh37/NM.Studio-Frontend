import {ProductStatus} from "../entities/product";
import {CreateCommand, UpdateCommand} from "./base/base-command";
import {SubCategory} from "@/types/entities/category";

export interface ProductCreateCommand extends CreateCommand {
    sku?: string | null;
    slug?: string | null;
    name?: string | null;
    subCategoryId?: string | null;
    subCategory?: SubCategory | null;
    price?: number | null;
    rentalPrice?: number | null;
    deposit?: number | null;
    isRentable: boolean;
    isSaleable: boolean;
    description?: string | null;
    material?: string | null;
    brand?: string | null;
    style?: string | null;
    care?: string | null;
}

export interface ProductUpdateCommand extends UpdateCommand {
    sku?: string | null;
    slug?: string | null;
    name?: string | null;
    subCategoryId?: string | null;
    subCategory?: SubCategory | null;
    price?: number | null;
    rentalPrice?: number | null;
    deposit?: number | null;
    isRentable: boolean;
    isSaleable: boolean;
    description?: string | null;
    material?: string | null;
    brand?: string | null;
    style?: string | null;
    care?: string | null;
}
