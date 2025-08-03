import { BlogStatus } from "../entities/blog";
import {CreateCommand, DeleteCommand, UpdateCommand} from "./base/base-command";

export interface BlogCreateCommand extends CreateCommand {
    title?: string | null;
    slug?: string | null;
    content?: string | null;
    summary?: string | null;
    thumbnail?: string | null;
    bannerImage?: string | null;
    status: BlogStatus;
    isFeatured: boolean;
    viewCount: number;
    tags?: string | null;
    authorId?: string | null;
    file?: File | null;
}

export interface BlogUpdateCommand extends UpdateCommand {
    title?: string | null;
    slug?: string | null;
    content?: string | null;
    summary?: string | null;
    thumbnail?: string | null;
    bannerImage?: string | null;
    status: BlogStatus;
    isFeatured: boolean;
    viewCount: number;
    tags?: string | null;
    authorId?: string | null;
    file?: File | null;
}

export interface BlogDeleteCommand extends DeleteCommand {

}