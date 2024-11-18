import {Photo} from "@/types/photo";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";

class PhotoService extends BaseService<Photo> {
    constructor() {
        super(`${Const.PHOTO}`);
    }
}

export const photoService = new PhotoService();
