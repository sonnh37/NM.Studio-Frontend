import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "@/types/cqrs/commands/base/base-command";

export interface ProductVariantCreateCommand extends CreateCommand {
  productId?: string | null | undefined;
  colorId?: string | null | undefined;
  isActive: boolean;
}

export interface ProductVariantUpdateCommand extends UpdateCommand {
  productId?: string | null | undefined;
  colorId?: string | null | undefined;
  isActive: boolean;
}

export interface ProductVariantDeleteCommand extends DeleteCommand {
  productId?: string | null | undefined;
  colorId?: string | null | undefined;
}
