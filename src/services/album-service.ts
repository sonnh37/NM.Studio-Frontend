import { Album } from "@/types/album";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { BaseService } from "./base-service";

class AlbumService extends BaseService<Album> {
    constructor() {
        super(`${process.env.NEXT_PUBLIC_API_BASE}/albums`);
    }
}

export const albumService = new AlbumService();
