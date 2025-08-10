import { GetQueryableQuery } from "@/types/queries/base/base-query";
import { MediaCategory, MediaType } from "../entities/media-file";

export interface MediaFileGetAllQuery extends GetQueryableQuery {
  title?: string | null | undefined;
  displayTitle?: string | null | undefined;
  description?: string | null | undefined;
  altText?: string | null | undefined;
  src?: string | null | undefined;
  thumbnailSrc?: string | null | undefined;
  mediumSrc?: string | null | undefined;
  largeSrc?: string | null | undefined;
  href?: string | null | undefined;
  type?: MediaType | null | undefined;
  mimeType?: string | null | undefined;
  fileSize?: number | null | undefined;
  width?: number | null | undefined;
  height?: number | null | undefined;
  duration?: string | null | undefined;
  resolution?: string | null | undefined;
  format?: string | null | undefined;
  tag?: string | null | undefined;
  isFeatured?: boolean | null | undefined;
  sortOrder?: number | null | undefined;
  category?: MediaCategory | null | undefined;
  isActive?: boolean | null | undefined;
  isWatermarked?: boolean | null | undefined;
  copyright?: string | null | undefined;
  createdMediaBy?: string | null | undefined;
  takenMediaDate?: string | null | undefined;
  location?: string | null | undefined;

  albumId?: string | null | undefined;
  productId?: string | null | undefined;
}
