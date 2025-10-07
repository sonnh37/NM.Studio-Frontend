import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "@/types/cqrs/commands/base/base-command";

export interface ProductMediaCreateCommand extends CreateCommand {
  productId?: string | null | undefined;
  mediaBaseId?: string | null | undefined;
}

export interface ProductMediaUpdateCommand extends UpdateCommand {
  productId?: string | null | undefined;
  mediaBaseId?: string | null | undefined;
}

export interface ProductMediaDeleteCommand extends DeleteCommand {
  productId?: string | null | undefined;
  mediaBaseId?: string | null | undefined;
}
