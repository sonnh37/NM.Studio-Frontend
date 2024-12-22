import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";

export interface ProductXSizeCreateCommand extends CreateCommand {
  productId?: string | null | undefined;
  sizeId?: string | null | undefined;
  isActive?: boolean;
}

export interface ProductXSizeUpdateCommand extends UpdateCommand {
  productId?: string | null | undefined;
  sizeId?: string | null | undefined;
  isActive?: boolean;
}
