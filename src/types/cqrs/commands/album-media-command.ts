import {CreateCommand, DeleteCommand, UpdateCommand} from "@/types/cqrs/commands/base/base-command";

export interface AlbumImageCreateCommand extends CreateCommand {
    albumId?: string | null;
    imageId?: string | null;
}

export interface AlbumImageUpdateCommand extends UpdateCommand {
    albumId?: string | null;
    imageId?: string | null;
}

export interface AlbumImageDeleteCommand extends DeleteCommand {
    albumId?: string | null;
    imageId?: string | null;
}
