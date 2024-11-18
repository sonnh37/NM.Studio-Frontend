import {Album} from "./album";
import {BaseEntity} from "./base";
import {Photo} from "./photo";

export interface AlbumXPhoto extends BaseEntity {
    albumId?: string;
    photoId?: string;
    album?: Album;
    photo?: Photo;
}