import { ProductStatus } from "../product";
import { CreateCommand, UpdateCommand } from "./base-command";

export interface ProductCreateCommand extends CreateCommand {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  subCategoryId?: string | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  description?: string | null | undefined;
  status?: ProductStatus | null | undefined;
}

export interface ProductUpdateCommand extends UpdateCommand {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  subCategoryId?: string | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  description?: string | null | undefined;
  status?: ProductStatus | null | undefined;
}
