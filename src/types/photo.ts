import {AlbumXPhoto} from "./album-x-photo";
import {BaseEntity} from "./base";
import {ProductXPhoto} from "@/types/product-x-photo";

export interface Photo extends BaseEntity {
    title?: string | null | undefined;
    description?: string | null | undefined;
    isFeatured: boolean;
    src?: string | null | undefined;
    href?: string | null | undefined;
    tag?: string | null | undefined;
    albumXPhotos?: AlbumXPhoto[];
    productXPhotos?: ProductXPhoto[];
}