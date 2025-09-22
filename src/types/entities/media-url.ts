import { BaseEntity } from "./base/base";
import { Video } from "./video";
import { Image } from "./image"; 

export interface MediaUrl extends BaseEntity {
  urlInternal?: string;
  urlExternal?: string;

  image?: Image;
  video?: Video;
}