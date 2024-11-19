import {Product} from "@/types/product";
import {Photo} from "@/types/photo";
import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";
import {ProductUpdateCommand} from "@/types/commands/product-command";
import {PhotoUpdateCommand} from "@/types/commands/photo-command";

export interface ProductXPhotoCreateCommand extends CreateCommand {
    productId?: string;
    photoId?: string;
    product?: Product;
    photo?: Photo;
}

export interface ProductXPhotoUpdateCommand extends UpdateCommand {
    productId?: string;
    photoId?: string;
    product?: ProductUpdateCommand;
    photo?: PhotoUpdateCommand;
}
