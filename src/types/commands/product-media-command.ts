import {CreateCommand, DeleteCommand, UpdateCommand} from "@/types/commands/base/base-command";

export interface ProductMediaCreateCommand extends CreateCommand {
    productId?: string | null;
    photoId?: string | null;
}

export interface ProductMediaUpdateCommand extends UpdateCommand {
    productId?: string | null;
    photoId?: string | null;
}

export interface ProductMediaDeleteCommand extends DeleteCommand {
    productId?: string | null;
    photoId?: string | null;
}
