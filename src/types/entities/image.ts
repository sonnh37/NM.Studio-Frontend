import { BaseEntity } from "./base/base";
import { MediaBase } from "./media-base";
import { MediaUrl } from "./media-url";

export interface Image extends BaseEntity {
  description?: string;
  mediaBaseId?: string;
  mediaUrlId?: string;

  mediaBase?: MediaBase;
  mediaUrl?: MediaUrl;
}