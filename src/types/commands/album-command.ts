import {CreateCommand, DeleteCommand, UpdateCommand} from "./base/base-command";

export interface AlbumCreateCommand extends CreateCommand {
    title?: string | null;
    slug?: string | null;
    description?: string | null;
    background?: string | null;
    eventDate?: string | null;
    brideName?: string | null;
    groomName?: string | null;
    location?: string | null;
    photographer?: string | null;
    isPublic: boolean;
    file?: File | null;
}

export interface AlbumUpdateCommand extends UpdateCommand {
    title?: string | null;
    slug?: string | null;
    description?: string | null;
    background?: string | null;
    eventDate?: string | null;
    brideName?: string | null;
    groomName?: string | null;
    location?: string | null;
    photographer?: string | null;
    isPublic: boolean;
    file?: File | null;
}


export interface AlbumDeleteCommand extends DeleteCommand {

}
