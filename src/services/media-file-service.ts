import {MediaFile} from "@/types/entities/media-file";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/response/business-result";
import {MediaFileCreateCommand, MediaFileUpdateCommand} from "@/types/commands/media-file-command";
import axiosInstance from "@/lib/interceptors/axios-instance";

class MediaFileService extends BaseService<MediaFile> {
    constructor() {
        super(`${Const.MEDIA_FILES}`);
    }

    async create(command: MediaFileCreateCommand): Promise<BusinessResult<MediaFile>> {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "MediaFile");
        }

        command.src = link ?? undefined;

        return await super.create(command);
    }

    async update(
        command: MediaFileUpdateCommand
    ): Promise<BusinessResult<MediaFile>> {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "MediaFile");
        }

        if (link && command.src) {
            await this.deleteImage(command.src);
        }

        command.src = link ?? command.src;

        const res = await axiosInstance.put<BusinessResult<MediaFile>>(this.endpoint, command);
        return res.data;
    };

}

export const mediaFileService = new MediaFileService();
