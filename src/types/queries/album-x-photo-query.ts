import {BaseQueryableQuery} from "@/types/queries/base-query";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";

export interface AlbumXPhotoGetAllquery extends BaseQueryableQuery {
    albumId?: string | null | undefined;
    photoId?: string | null | undefined;
    album?: AlbumGetAllQuery | null | undefined;
    photo?: PhotoGetAllQuery | null | undefined;
}
