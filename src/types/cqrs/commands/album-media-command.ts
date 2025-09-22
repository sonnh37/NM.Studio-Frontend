import {CreateCommand, DeleteCommand, UpdateCommand} from "@/types/commands/base/base-command";

export interface AlbumMediaCreateCommand extends CreateCommand {
    albumId?: string | null | undefined;
    mediaFileId?: string | null | undefined;
}

export interface AlbumMediaUpdateCommand extends UpdateCommand {
    albumId?: string | null | undefined;
    mediaFileId?: string | null | undefined;
}

export interface AlbumMediaDeleteCommand extends DeleteCommand {
    albumId?: string | null | undefined;
    mediaFileId?: string | null | undefined;
}
