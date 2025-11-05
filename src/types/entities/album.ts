import { AlbumImage } from "./album-image";
import { BaseEntity } from "./base/base";

export interface Album extends BaseEntity {
  title?: string;
  slug?: string;
  description?: string;
  eventDate?: string;
  brideName?: string;
  groomName?: string;
  location?: string;
  photographer?: string;
  isFeatured: boolean;
  coverUrl?: string;
  albumImages: AlbumImage[];
}
