import {CreateCommand, UpdateCommand} from "@/types/commands/base/base-command";
import {MediaCategory, MediaType} from "@/types/entities/media-file";

export interface MediaFileCreateCommand extends CreateCommand {
    title?: string | null;
    displayTitle?: string | null;
    description?: string | null;
    altText?: string | null;
    src?: string | null;
    thumbnailSrc?: string | null;
    mediumSrc?: string | null;
    largeSrc?: string | null;
    href?: string | null;
    type: MediaType;
    mimeType?: string | null;
    fileSize: number;
    width?: number | null;
    height?: number | null;
    duration?: string | null;
    resolution?: string | null;
    format?: string | null;
    tag?: string | null;
    isFeatured: boolean;
    sortOrder: number;
    category: MediaCategory;
    isActive: boolean;
    isWatermarked: boolean;
    copyright?: string | null;
    createdMediaBy?: string | null;
    takenMediaDate?: string | null;
    location?: string | null;
    file?: File | null;
}

export interface MediaFileUpdateCommand extends UpdateCommand {
    title?: string | null;
    displayTitle?: string | null;
    description?: string | null;
    altText?: string | null;
    src?: string | null;
    thumbnailSrc?: string | null;
    mediumSrc?: string | null;
    largeSrc?: string | null;
    href?: string | null;
    type: MediaType;
    mimeType?: string | null;
    fileSize: number;
    width?: number | null;
    height?: number | null;
    duration?: string | null;
    resolution?: string | null;
    format?: string | null;
    tag?: string | null;
    isFeatured: boolean;
    sortOrder: number;
    category: MediaCategory;
    isActive: boolean;
    isWatermarked: boolean;
    copyright?: string | null;
    createdMediaBy?: string | null;
    takenMediaDate?: string | null;
    location?: string | null;
    file?: File | null;
}
