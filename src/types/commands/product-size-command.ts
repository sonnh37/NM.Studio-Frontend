import {CreateCommand, DeleteCommand, UpdateCommand} from "@/types/commands/base/base-command";

export interface ProductSizeCreateCommand extends CreateCommand {
    productId?: string | null;
    sizeId?: string | null;
    isActive?: boolean;
}

export interface ProductSizeUpdateCommand extends UpdateCommand {
    productId?: string | null;
    sizeId?: string | null;
    isActive?: boolean;
}

export interface ProductSizeDeleteCommand extends DeleteCommand {
    productId?: string | null;
    sizeId?: string | null;
    isActive?: boolean;
}
