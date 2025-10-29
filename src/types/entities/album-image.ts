import { Album } from "./album";
import { BaseEntity } from "./base/base";
import { MediaBase } from "./media-base";

export interface AlbumImage extends BaseEntity {
  isCover: boolean;
  isThumbnail: boolean;
  imageId?: string;
  albumId?: string;
  album?: Album;
  image?: MediaBase;
}
