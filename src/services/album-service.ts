import {Album} from "@/types/album";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";

class AlbumService extends BaseService<Album> {
    constructor() {
        super(`${Const.ALBUM}`);
    }
}

export const albumService = new AlbumService();
