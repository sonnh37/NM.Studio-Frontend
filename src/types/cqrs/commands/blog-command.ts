import { BlogStatus } from "@/types/entities/blog";
import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

export interface BlogCreateCommand extends CreateCommand {
  authorId?: string | null;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  summary?: string | null;
  thumbnailId?: string | null;
  backgroundCoverId?: string | null;
  status: BlogStatus;
  isFeatured: boolean;
  viewCount: number;
  tags?: string | null;
}

export interface BlogUpdateCommand extends UpdateCommand {
  authorId?: string | null;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  summary?: string | null;
  thumbnailId?: string | null;
  backgroundCoverId?: string | null;
  status: BlogStatus;
  isFeatured: boolean;
  viewCount: number;
  tags?: string | null;
}

export interface BlogDeleteCommand extends DeleteCommand {}
