import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface CategoryCreateCommand extends CreateCommand {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  isFeatured: boolean | null;
}

export interface CategoryUpdateCommand extends UpdateCommand {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  isFeatured: boolean | null;
}

export interface SubCategoryCreateCommand extends CreateCommand {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  isFeatured: boolean | null;
  categoryId?: string | null;
}

export interface SubCategoryUpdateCommand extends UpdateCommand {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  isFeatured: boolean | null;
  categoryId?: string | null;
}
