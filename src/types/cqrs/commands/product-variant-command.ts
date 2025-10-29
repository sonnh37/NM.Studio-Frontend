import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "@/types/cqrs/commands/base/base-command";
import { ProductStatus } from "@/types/entities/product";

export interface ProductVariantCreateCommand extends CreateCommand {
  productId?: string | null;
  sku?: string | null;
  color?: string | null;
  size?: string | null;
  price?: number | null;
  rentalPrice?: number | null;
  deposit?: number | null;
  stockQuantity: number | null;
  status: ProductStatus | null;
}

export interface ProductVariantUpdateCommand extends UpdateCommand {
  productId?: string | null;
  sku?: string | null;
  color?: string | null;
  size?: string | null;
  price?: number | null;
  rentalPrice?: number | null;
  deposit?: number | null;
  stockQuantity: number | null;
  status: ProductStatus | null;
}

export interface ProductVariantDeleteCommand extends DeleteCommand {}
