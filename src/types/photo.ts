import {AlbumXPhoto} from "./album";
import {BaseEntity} from "./base";
import {ProductXPhoto} from "@/types/product-x-photo";

export interface Photo extends BaseEntity {
    title?: string;
    description?: string;
    src?: string;
    href?: string;
    tag?: string;
    albumXPhotos?: AlbumXPhoto[];
    productXPhotos?: ProductXPhoto[];
}