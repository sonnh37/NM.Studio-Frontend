import { BaseEntity } from "./base/base";
import { MediaBase } from "./media-base";
import { MediaUrl } from "./media-url";

export interface Video extends BaseEntity {
  duration: number;
  description?: string;
  category: VideoCategory;
  resolution?: string;
  mediaBaseId?: string;
  mediaUrlId?: string;

  mediaBase?: MediaBase;
  mediaUrl?: MediaUrl;
}

export enum VideoCategory {
  PreWedding = 0,
  FullWeddingDay = 1,
  BehindTheScenes = 2,
}
