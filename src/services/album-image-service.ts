import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";
import {AlbumImage} from "@/types/entities/album-image";

class AlbumImageService extends BaseService<AlbumImage> {
    constructor() {
        super(`${Constants.ALBUM_IMAGES}`);
    }
}

export const albumImageService = new AlbumImageService();
