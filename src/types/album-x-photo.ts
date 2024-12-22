import {Album} from "./album";
import {BaseEntity} from "./base";
import {Photo} from "./photo";

export interface AlbumXPhoto extends BaseEntity {
    albumId?: string | null | undefined;
    photoId?: string | null | undefined;
    album?: Album | null | undefined;
    photo?: Photo | null | undefined;
}