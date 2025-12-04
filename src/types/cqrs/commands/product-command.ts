import { ProductStatus } from "@/types/entities/product";
import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

export interface ProductCreateCommand extends CreateCommand {
  sku?: string | null;
  name?: string | null;
  slug?: string | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  thumbnailId?: string | null;
  description?: string | null;
  material?: string | null;
  status?: ProductStatus | null;
}

export interface ProductUpdateCommand extends UpdateCommand {
  sku?: string | null;
  name?: string | null;
  slug?: string | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  thumbnailId?: string | null;
  description?: string | null;
  material?: string | null;
  status?: ProductStatus | null;
}

export interface ProductUpdateStatusCommand extends UpdateCommand {
  status?: ProductStatus | null;
}

export interface ProductDeleteCommand extends DeleteCommand {}
