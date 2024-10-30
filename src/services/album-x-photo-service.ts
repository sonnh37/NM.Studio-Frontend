import { AlbumXPhoto } from "@/types/album-x-photo";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";

class AlbumXPhotoService extends BaseService<AlbumXPhoto> {
    constructor() {
        super(`${Const.ALBUM_X_PHOTO}`);
    }
}

export const albumXPhotoService = new AlbumXPhotoService();
