import {CreateCommand, DeleteCommand, UpdateCommand} from "./base/base-command";

export interface ServiceCreateCommand extends CreateCommand {
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    src?: string | null;
    price?: number | null;
    category?: string | null;
    isFeatured: boolean;
    isActive: boolean;
    sortOrder: number;
    imageUrl?: string | null;
    shortDescription?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    termsAndConditions?: string | null;
    maxBookingsPerDay?: number | null;
    file?: File | null;
}

export interface ServiceUpdateCommand extends UpdateCommand {
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    src?: string | null;
    price?: number | null;
    category?: string | null;
    isFeatured: boolean;
    isActive: boolean;
    sortOrder: number;
    imageUrl?: string | null;
    shortDescription?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    termsAndConditions?: string | null;
    maxBookingsPerDay?: number | null;
    file?: File | null;
}


export interface ServiceDeleteCommand extends DeleteCommand {
    
}
