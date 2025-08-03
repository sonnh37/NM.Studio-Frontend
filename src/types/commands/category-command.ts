import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface CategoryCreateCommand extends CreateCommand {
    name?: string | null;
    displayName?: string | null;
    slug?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    iconUrl?: string | null;
    imageUrl?: string | null;
    thumbnailUrl?: string | null;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
}

export interface CategoryUpdateCommand extends UpdateCommand {
    name?: string | null;
    displayName?: string | null;
    slug?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    iconUrl?: string | null;
    imageUrl?: string | null;
    thumbnailUrl?: string | null;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
}

export interface SubCategoryCreateCommand extends CreateCommand {
    name?: string | null;
    displayName?: string | null;
    slug?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    imageUrl?: string | null;
    isActive: boolean;
    sortOrder: number;
    metaTitle?: string | null;
    metaDescription?: string | null;
    isFeatured: boolean;
    categoryId?: string | null;
}

export interface SubCategoryUpdateCommand extends UpdateCommand {
    name?: string | null;
    displayName?: string | null;
    slug?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    imageUrl?: string | null;
    isActive: boolean;
    sortOrder: number;
    metaTitle?: string | null;
    metaDescription?: string | null;
    isFeatured: boolean;
    categoryId?: string | null;
}