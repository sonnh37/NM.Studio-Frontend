import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "@/types/commands/base/base-command";

export interface ProductSizeCreateCommand extends CreateCommand {
  productId?: string | null | undefined;
  sizeId?: string | null | undefined;
  isActive: boolean;
}

export interface ProductSizeUpdateCommand extends UpdateCommand {
  productId?: string | null | undefined;
  sizeId?: string | null | undefined;
  isActive: boolean;
}

export interface ProductSizeDeleteCommand extends DeleteCommand {
  productId?: string | null | undefined;
  sizeId?: string | null | undefined;
  isActive: boolean;
}
