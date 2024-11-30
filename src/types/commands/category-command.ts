import { CreateCommand, UpdateCommand } from "./base-command";

export interface CategoryCreateCommand extends CreateCommand {
    name?: string;
}

export interface CategoryUpdateCommand extends UpdateCommand {
    name?: string;
}

export interface SubCategoryCreateCommand extends CreateCommand {
    name?: string;
    categoryId?: string;
}

export interface SubCategoryUpdateCommand extends UpdateCommand {
    name?: string;
    categoryId?: string;
}