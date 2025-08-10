import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

export interface ServiceCreateCommand extends CreateCommand {
  name?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  src?: string | null | undefined;
  price?: number | null | undefined;
  category?: string | null | undefined;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  imageUrl?: string | null | undefined;
  shortDescription?: string | null | undefined;
  metaTitle?: string | null | undefined;
  metaDescription?: string | null | undefined;
  metaKeywords?: string | null | undefined;
  termsAndConditions?: string | null | undefined;
  maxBookingsPerDay?: number | null | undefined;
  file?: File | null | undefined;
}

export interface ServiceUpdateCommand extends UpdateCommand {
  name?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  src?: string | null | undefined;
  price?: number | null | undefined;
  category?: string | null | undefined;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  imageUrl?: string | null | undefined;
  shortDescription?: string | null | undefined;
  metaTitle?: string | null | undefined;
  metaDescription?: string | null | undefined;
  metaKeywords?: string | null | undefined;
  termsAndConditions?: string | null | undefined;
  maxBookingsPerDay?: number | null | undefined;
  file?: File | null | undefined;
}

export interface ServiceDeleteCommand extends DeleteCommand {}
