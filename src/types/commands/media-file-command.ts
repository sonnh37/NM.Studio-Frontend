import {
  CreateCommand,
  UpdateCommand,
} from "@/types/commands/base/base-command";
import { MediaCategory, MediaType } from "@/types/entities/media-file";

export interface MediaFileCreateCommand extends CreateCommand {
  title?: string | null | undefined;
  displayTitle?: string | null | undefined;
  description?: string | null | undefined;
  altText?: string | null | undefined;
  src?: string | null | undefined;
  thumbnailSrc?: string | null | undefined;
  mediumSrc?: string | null | undefined;
  largeSrc?: string | null | undefined;
  href?: string | null | undefined;
  type: MediaType;
  mimeType?: string | null | undefined;
  fileSize: number;
  width?: number | null | undefined;
  height?: number | null | undefined;
  duration?: string | null | undefined;
  resolution?: string | null | undefined;
  format?: string | null | undefined;
  tag?: string | null | undefined;
  isFeatured: boolean;
  sortOrder: number;
  category: MediaCategory;
  isActive: boolean;
  isWatermarked: boolean;
  copyright?: string | null | undefined;
  createdMediaBy?: string | null | undefined;
  takenMediaDate?: string | null | undefined;
  location?: string | null | undefined;
  file?: File | null | undefined;
}

export interface MediaFileUpdateCommand extends UpdateCommand {
  title?: string | null | undefined;
  displayTitle?: string | null | undefined;
  description?: string | null | undefined;
  altText?: string | null | undefined;
  src?: string | null | undefined;
  thumbnailSrc?: string | null | undefined;
  mediumSrc?: string | null | undefined;
  largeSrc?: string | null | undefined;
  href?: string | null | undefined;
  type: MediaType;
  mimeType?: string | null | undefined;
  fileSize: number;
  width?: number | null | undefined;
  height?: number | null | undefined;
  duration?: string | null | undefined;
  resolution?: string | null | undefined;
  format?: string | null | undefined;
  tag?: string | null | undefined;
  isFeatured: boolean;
  sortOrder: number;
  category: MediaCategory;
  isActive: boolean;
  isWatermarked: boolean;
  copyright?: string | null | undefined;
  createdMediaBy?: string | null | undefined;
  takenMediaDate?: string | null | undefined;
  location?: string | null | undefined;
  file?: File | null | undefined;
}
