import { ProductStatus } from "@/types/entities/product";
import { CreateCommand, UpdateCommand } from "./base/base-command";

export interface ProductCreateCommand extends CreateCommand {
  sku?: string | null;
  name: string | null;
  slug?: string | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  description?: string | null;
  material?: string | null;
  status: ProductStatus | null;
}

export interface ProductUpdateCommand extends UpdateCommand {
  sku?: string | null;
  name: string | null;
  slug?: string | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  description?: string | null;
  material?: string | null;
  status: ProductStatus | null;
}
