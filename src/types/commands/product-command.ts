import {CreateCommand, UpdateCommand} from "./base-command";

export interface ProductCreateCommand extends CreateCommand {
    sku?: string;
    slug?: string;
    subCategoryId?: string;
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
}

export interface ProductUpdateCommand extends UpdateCommand {
    sku?: string;
    slug?: string;
    subCategoryId?: string;
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
}
