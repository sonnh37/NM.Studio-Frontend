import { ProductStatus } from "../entities/product";
import { CreateCommand, UpdateCommand } from "./base/base-command";
import { SubCategory } from "@/types/entities/category";

export interface ProductCreateCommand extends CreateCommand {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  name?: string | null | undefined;
  subCategoryId?: string | null | undefined;
  subCategory?: SubCategory | null | undefined;
  price?: number | null | undefined;
  rentalPrice?: number | null | undefined;
  deposit?: number | null | undefined;
  isRentable: boolean;
  isSaleable: boolean;
  description?: string | null | undefined;
  material?: string | null | undefined;
  brand?: string | null | undefined;
  style?: string | null | undefined;
  care?: string | null | undefined;
  status: ProductStatus;
}

export interface ProductUpdateCommand extends UpdateCommand {
  sku?: string | null | undefined;
  slug?: string | null | undefined;
  name?: string | null | undefined;
  subCategoryId?: string | null | undefined;
  subCategory?: SubCategory | null | undefined;
  price?: number | null | undefined;
  rentalPrice?: number | null | undefined;
  deposit?: number | null | undefined;
  isRentable: boolean;
  isSaleable: boolean;
  description?: string | null | undefined;
  material?: string | null | undefined;
  brand?: string | null | undefined;
  style?: string | null | undefined;
  care?: string | null | undefined;
  status: ProductStatus;
}
