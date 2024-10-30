import { Photo } from "@/types/photo";
import { PhotoGetAllQuery } from "@/types/queries/photo-query";
import { BaseService } from "./base-service"; 
class PhotoService extends BaseService<Photo> {
    constructor() {
        super(`${process.env.NEXT_PUBLIC_API_BASE}/photos`);
    }

    
}

export const photoService = new PhotoService();
