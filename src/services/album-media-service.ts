import {AlbumMedia} from "@/types/entities/album-media";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class AlbumMediaService extends BaseService<AlbumMedia> {
    constructor() {
        super(`${Const.ALBUM_MEDIAS}`);
    }
}

export const albumMediaService = new AlbumMediaService();
