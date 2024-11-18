import {BaseQueryableQuery} from "./base-query";

export interface PhotoGetAllQuery extends BaseQueryableQuery {
    title?: string;
    description?: string;
    src?: string;
    href?: string;
    tag?: string;
    albumId?: string;
}