import {CreateCommand, UpdateCommand} from "./base-command";

export interface BlogCreateCommand extends CreateCommand {
    title?: string;         
    slug?: string;          
    content?: string;       
    isFeatured: boolean;    
    thumbnail?: string; 
}

export interface BlogUpdateCommand extends UpdateCommand {
    title?: string;         
    slug?: string;          
    content?: string;       
    isFeatured: boolean;    
    thumbnail?: string; 
}
