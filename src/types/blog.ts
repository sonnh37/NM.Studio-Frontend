import { BaseEntity } from "./base";

export interface Blog extends BaseEntity {
    title?: string;         
    slug?: string;          
    content?: string;       
    isFeatured: boolean;    
    thumbnail?: string;    
}