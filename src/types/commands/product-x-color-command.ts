import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";

export interface ProductXColorCreateCommand extends CreateCommand {
    productId?: string | null | undefined;
    colorId?: string | null | undefined;
    isActive?: boolean;
}

export interface ProductXColorUpdateCommand extends UpdateCommand {
    productId?: string | null | undefined;
    colorId?: string | null | undefined;
    isActive?: boolean;
}
