import { MediaBase } from "./media-base";
import { User } from "./user";

export interface Blog {
  authorId?: string;
  title?: string;
  slug?: string;
  content?: string;
  summary?: string;
  thumbnailId?: string;
  backgroundCoverId?: string;
  status: BlogStatus;
  isFeatured: boolean;
  viewCount: number;
  tags?: string;
  thumbnail?: MediaBase;
  backgroundCover?: MediaBase;
  author?: User;
}

export enum BlogStatus {
  Draft,
  Published,
  Archived,
}
