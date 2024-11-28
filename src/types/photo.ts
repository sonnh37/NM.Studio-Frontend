import { AlbumXPhoto } from "./album-x-photo";
import {BaseEntity} from "./base";
import {ProductXPhoto} from "@/types/product-x-photo";

export interface Photo extends BaseEntity {
    title?: string;
    description?: string;
    isFeatured: boolean;
    src?: string;
    href?: string;
    tag?: string;
    albumXPhotos?: AlbumXPhoto[];
    productXPhotos?: ProductXPhoto[];
}