import { BlogStatus } from "../entities/blog";
import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

export interface BlogCreateCommand extends CreateCommand {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  content?: string | null | undefined;
  summary?: string | null | undefined;
  thumbnail?: string | null | undefined;
  bannerImage?: string | null | undefined;
  status: BlogStatus;
  isFeatured: boolean;
  viewCount: number;
  tags?: string | null | undefined;
  authorId?: string | null | undefined;
  file_bannerImage?: File | null | undefined;
  file_thumbnail?: File | null | undefined;
}

export interface BlogUpdateCommand extends UpdateCommand {
  title?: string | null | undefined;
  slug?: string | null | undefined;
  content?: string | null | undefined;
  summary?: string | null | undefined;
  thumbnail?: string | null | undefined;
  bannerImage?: string | null | undefined;
  status: BlogStatus;
  isFeatured: boolean;
  viewCount: number;
  tags?: string | null | undefined;
  authorId?: string | null | undefined;
  file_bannerImage?: File | null | undefined;
  file_thumbnail?: File | null | undefined;
}

export interface BlogDeleteCommand extends DeleteCommand {}
