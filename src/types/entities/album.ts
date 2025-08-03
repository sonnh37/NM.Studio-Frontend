import {AlbumMedia} from "./album-media";
import {BaseEntity} from "./base/base";

export interface Album extends BaseEntity{
    title?: string;
    slug?: string;
    description?: string;
    background?: string;
    eventDate?: string;
    brideName?: string;
    groomName?: string;
    location?: string;
    photographer?: string;
    isPublic: boolean;
    albumMedias: AlbumMedia[];
}

