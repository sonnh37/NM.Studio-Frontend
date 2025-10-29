import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";
import {AlbumImage} from "@/types/entities/album-image";

class AlbumImageService extends BaseService<AlbumImage> {
    constructor() {
        super(`${Const.ALBUM_IMAGES}`);
    }
}

export const albumImageService = new AlbumImageService();
