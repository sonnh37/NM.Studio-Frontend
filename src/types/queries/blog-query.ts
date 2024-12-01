import { BaseQueryableQuery } from "./base-query";

export interface BlogGetAllQuery extends BaseQueryableQuery {
    title?: string;         
    slug?: string;          
    content?: string;   
    isNotNullSlug: boolean    
    isFeatured?: boolean;    
    thumbnail?: string;    
}