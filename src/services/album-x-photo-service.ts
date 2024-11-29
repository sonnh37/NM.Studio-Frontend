import {AlbumXPhoto} from "@/types/album-x-photo";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";
import {BusinessResult} from "@/types/response/business-result";
import axiosInstance from "@/lib/axios-instance";
import { AlbumXPhotoUpdateCommand } from "@/types/commands/album-x-photo-command";

class AlbumXPhotoService extends BaseService<AlbumXPhoto> {
    constructor() {
        super(`${Const.ALBUM_X_PHOTO}`);
    }

    public delete_ = (query?: AlbumXPhotoUpdateCommand): Promise<BusinessResult<null>> => {
        const params = query ? {...query} : {};
        return axiosInstance
            .delete<BusinessResult<null>>(`${this.endpoint}`, {params})
            .then((response) => response.data)
            .catch((error) => this.handleError(error)); // Xử lý lỗi
    };
}

export const albumXPhotoService = new AlbumXPhotoService();
