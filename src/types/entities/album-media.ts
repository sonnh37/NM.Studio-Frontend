import {Album} from "./album";
import {BaseEntity} from "./base/base";
import {MediaFile} from "./media-file";

export interface AlbumMedia extends BaseEntity{
    albumId?: string;
    mediaFileId?: string;
    album?: Album;
    mediaFile?: MediaFile;
}