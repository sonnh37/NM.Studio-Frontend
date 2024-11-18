import {AlbumXPhoto} from "./album-x-photo";
import {BaseEntity} from "./base";

export interface Album extends BaseEntity {
    title?: string;
    description?: string;
    background?: string;
    albumXPhotos?: AlbumXPhoto[];
}

