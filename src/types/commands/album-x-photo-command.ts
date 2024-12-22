import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";

export interface AlbumXPhotoCreateCommand extends CreateCommand {
    albumId?: string | null | undefined;
    photoId?: string | null | undefined;
}

export interface AlbumXPhotoUpdateCommand extends UpdateCommand {
    albumId?: string | null | undefined;
    photoId?: string | null | undefined;
}
