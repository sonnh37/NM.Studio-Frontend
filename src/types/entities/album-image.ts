import {Album} from "./album";
import {BaseEntity} from "./base/base";
import {MediaFile} from "./media-file";
import {Image} from "./image";

export interface AlbumImage extends BaseEntity {
  sortOrder: number;
  isCover: boolean;
  isThumbnail: boolean;
  imageId?: string;
  albumId?: string;
  album?: Album;
  image?: Image;
}
