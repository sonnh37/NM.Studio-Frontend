import { BaseEntity } from "./base";

export interface Blog extends BaseEntity {
    title?: string | null | undefined;         
    slug?: string | null | undefined;          
    content?: string | null | undefined;       
    isFeatured: boolean;    
    thumbnail?: string | null | undefined;    
}