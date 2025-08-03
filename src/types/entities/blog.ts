import {BaseEntity} from "./base/base";
import { User } from "./user";

export enum BlogStatus {
    Draft,
    Published,
    Archived
}

export interface Blog extends BaseEntity{
    title?: string;
    slug?: string;
    content?: string;
    summary?: string;
    thumbnail?: string;
    bannerImage?: string;
    status: BlogStatus;
    isFeatured: boolean;
    viewCount: number;
    tags?: string;
    authorId?: string;
    author?: User;
}