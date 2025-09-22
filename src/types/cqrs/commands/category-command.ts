import {CreateCommand, UpdateCommand} from "./base/base-command";

export interface CategoryCreateCommand extends CreateCommand {
    name?: string | null | undefined;
    displayName?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    shortDescription?: string | null | undefined;
    iconUrl?: string | null | undefined;
    imageUrl?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
}

export interface CategoryUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
    displayName?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    shortDescription?: string | null | undefined;
    iconUrl?: string | null | undefined;
    imageUrl?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
}

export interface SubCategoryCreateCommand extends CreateCommand {
    name?: string | null | undefined;
    displayName?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    shortDescription?: string | null | undefined;
    imageUrl?: string | null | undefined;
    isActive: boolean;
    sortOrder: number;
    metaTitle?: string | null | undefined;
    metaDescription?: string | null | undefined;
    isFeatured: boolean;
    categoryId?: string | null | undefined;
}

export interface SubCategoryUpdateCommand extends UpdateCommand {
    name?: string | null | undefined;
    displayName?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    shortDescription?: string | null | undefined;
    imageUrl?: string | null | undefined;
    isActive: boolean;
    sortOrder: number;
    metaTitle?: string | null | undefined;
    metaDescription?: string | null | undefined;
    isFeatured: boolean;
    categoryId?: string | null | undefined;
}