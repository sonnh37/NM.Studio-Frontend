import {AlbumMedia} from "./album-image";
import {BaseEntity} from "./base/base";
import {ProductMedia} from "@/types/entities/product-media";

export enum MediaType {
    Image,
    Video,
    Audio,
    Document,
    Animation
}

export enum MediaCategory {
    Product,
    Model,
    Detail,
    Marketing,
    Banner,
    Advertisement,
    Event,
    BehindTheScenes,
    Document,
    Contract,
    Lifestyle,
    Social,
    Misc
}


export interface MediaFile extends BaseEntity {
    title?: string;
    displayTitle?: string;
    description?: string;
    altText?: string;
    src?: string;
    thumbnailSrc?: string;
    mediumSrc?: string;
    largeSrc?: string;
    href?: string;
    type: MediaType;
    mimeType?: string;
    fileSize: number;
    width?: number;
    height?: number;
    duration?: string;
    resolution?: string;
    format?: string;
    tag?: string;
    isFeatured: boolean;
    sortOrder: number;
    category: MediaCategory;
    isActive: boolean;
    isWatermarked: boolean;
    copyright?: string;
    createdMediaBy?: string;
    takenMediaDate?: string;
    location?: string;
    albumMedias: AlbumMedia[];
    productMedias: ProductMedia[];
}