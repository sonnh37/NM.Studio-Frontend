import {Album} from "@/types/album";
import {Photo} from "@/types/photo";
import {CreateCommand, UpdateCommand} from "@/types/commands/base-command";
import {AlbumUpdateCommand} from "@/types/commands/album-command";
import {PhotoUpdateCommand} from "@/types/commands/photo-command";

export interface AlbumXPhotoCreateCommand extends CreateCommand {
    albumId?: string;
    photoId?: string;
    album?: Album;
    photo?: Photo;
}

export interface AlbumXPhotoUpdateCommand extends UpdateCommand {
    albumId?: string;
    photoId?: string;
    album?: AlbumUpdateCommand;
    photo?: PhotoUpdateCommand;
}
