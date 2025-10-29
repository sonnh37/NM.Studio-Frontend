import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "@/types/cqrs/commands/base/base-command";

export interface ProductMediaCreateCommand extends CreateCommand {
  productVariantId?: string | null;
  mediaBaseId?: string | null;
}

export interface ProductMediaUpdateCommand extends UpdateCommand {
  productVariantId?: string | null;
  mediaBaseId?: string | null;
}

export interface ProductMediaDeleteCommand extends DeleteCommand {
  productVariantId?: string | null;
  mediaBaseId?: string | null;
}
