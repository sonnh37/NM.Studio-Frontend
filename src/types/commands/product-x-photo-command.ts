import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";

export interface ProductXPhotoCreateCommand extends CreateCommand {
    productId?: string | null | undefined;
    photoId?: string | null | undefined;
}

export interface ProductXPhotoUpdateCommand extends UpdateCommand {
    productId?: string | null | undefined;
    photoId?: string | null | undefined;
}
