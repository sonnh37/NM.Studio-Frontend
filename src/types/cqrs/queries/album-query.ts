import { GetQueryableQuery } from "./base/base-query";

export interface AlbumGetAllQuery extends GetQueryableQuery {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  background?: string | null | undefined;
  eventDate?: string | null | undefined;
  brideName?: string | null | undefined;
  groomName?: string | null | undefined;
  location?: string | null | undefined;
  photographer?: string | null | undefined;
  isFeatured?: boolean | null | undefined;
}
