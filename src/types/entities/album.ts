import { AlbumImage } from "./album-image";
import { BaseEntity } from "./base/base";

export interface Album {
  title?: string;
  slug?: string;
  description?: string;
  eventDate?: string; // DateTimeOffset? -> string | undefined
  brideName?: string;
  groomName?: string;
  location?: string;
  photographer?: string;
  sortOrder: number;
  isFeatured: boolean;
  homeSortOrder?: number;
  albumImages: AlbumImage[];
}
