import { BlogStatus } from "../entities/blog";
import { GetQueryableQuery } from "./base/base-query";

export interface BlogGetAllQuery extends GetQueryableQuery {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  content?: string | null | undefined;
  summary?: string | null | undefined;
  thumbnail?: string | null | undefined;
  bannerImage?: string | null | undefined;
  status?: BlogStatus | null | undefined;
  isFeatured?: boolean | null | undefined;
  viewCount?: number | null | undefined;
  tags?: string | null | undefined;
  authorId?: string | null | undefined;
}
