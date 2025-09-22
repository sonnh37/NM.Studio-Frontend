import { GetQueryableQuery } from "@/types/queries/base/base-query";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { MediaFileGetAllQuery } from "@/types/queries/media-file-query";

export interface AlbumMediaGetAllQuery extends GetQueryableQuery {
  albumId?: string | null | undefined;
  photoId?: string | null | undefined;
}
