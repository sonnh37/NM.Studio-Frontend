import { GetQueryableQuery } from "@/types/queries/base/base-query";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { MediaBaseGetAllQuery } from "@/types/queries/media-file-query";

export interface AlbumImageGetAllQuery extends GetQueryableQuery {
  albumId?: string | null | undefined;
  photoId?: string | null | undefined;
}
