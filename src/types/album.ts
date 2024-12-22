import {AlbumXPhoto} from "./album-x-photo";
import {BaseEntity} from "./base";

export interface Album extends BaseEntity {
    title?: string | null | undefined;
    slug?: string | null | undefined;
    description?: string | null | undefined;
    background?: string | null | undefined;
    albumXPhotos?: AlbumXPhoto[];
}

