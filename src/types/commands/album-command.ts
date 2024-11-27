import {AlbumXPhoto} from "../album-x-photo";
import {CreateCommand, UpdateCommand} from "./base-command";

export interface AlbumCreateCommand extends CreateCommand {
    title?: string;
    slug?: string;
    description?: string;
    background?: string;
    albumXPhotos?: AlbumXPhoto[];
}

export interface AlbumUpdateCommand extends UpdateCommand {
    title?: string;
    slug?: string;
    description?: string;
    background?: string;
    albumXPhotos?: AlbumXPhoto[];
}
