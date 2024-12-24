import {CreateCommand, UpdateCommand} from "./base-command";

export interface CategoryCreateCommand extends CreateCommand {
    name?: string | null | undefined;
}

export interface CategoryUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
}

export interface SubCategoryCreateCommand extends CreateCommand {
    name?: string | null | undefined;
    categoryId?: string | null | undefined;
}

export interface SubCategoryUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
    categoryId?: string | null | undefined;
}