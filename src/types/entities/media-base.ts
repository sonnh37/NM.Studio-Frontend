import { BaseEntity } from "./base/base";
import { Video } from "./video";
import { Image } from "./image";
export interface MediaBase extends BaseEntity {
  displayName?: string;
  title?: string;
  mimeType?: string;
  size: number;
  width?: number;
  height?: number;
  createdMediaBy?: string;
  takenMediaDate?: string;

  image?: Image;
  video?: Video;
}
