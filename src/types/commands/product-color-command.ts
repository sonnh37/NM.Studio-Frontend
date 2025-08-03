import {CreateCommand, DeleteCommand, UpdateCommand} from "@/types/commands/base/base-command";

export interface ProductColorCreateCommand extends CreateCommand {
    productId?: string | null;
    colorId?: string | null;
    isActive: boolean;
}

export interface ProductColorUpdateCommand extends UpdateCommand {
    productId?: string | null;
    colorId?: string | null;
    isActive: boolean;
}

export interface ProductColorDeleteCommand extends DeleteCommand {
    productId?: string | null;
    colorId?: string | null;
}
