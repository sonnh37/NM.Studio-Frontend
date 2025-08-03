import {CreateCommand, DeleteCommand, UpdateCommand} from "@/types/commands/base/base-command";

export interface AlbumMediaCreateCommand extends CreateCommand {
    albumId?: string | null;
    mediaFileId?: string | null;
}

export interface AlbumMediaUpdateCommand extends UpdateCommand {
    albumId?: string | null;
    mediaFileId?: string | null;
}

export interface AlbumMediaDeleteCommand extends DeleteCommand {
    albumId?: string | null;
    mediaFileId?: string | null;
}
