import {Album} from "@/types/entities/album";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/response/business-result";
import {AlbumCreateCommand, AlbumDeleteCommand, AlbumUpdateCommand,} from "@/types/commands/album-command";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {CreateCommand} from "@/types/commands/base/base-command";

class AlbumService extends BaseService<Album> {
    constructor() {
        super(`${Const.ALBUMS}`);
    }

    async create(command: AlbumCreateCommand): Promise<BusinessResult<Album>> {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "Album");
        }

        command.background = link ?? undefined;

        return await super.create(command);
    }

    async update(
        command: AlbumUpdateCommand
    ): Promise<BusinessResult<Album>> {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "Album");
        }

        if (link && command.background) {
            await this.deleteImage(command.background);
        }

        command.background = link ?? command.background;

        const res = await axiosInstance.put<BusinessResult<Album>>(this.endpoint, command);
        return res.data;
    };

    async deletePermanently(
        command: AlbumDeleteCommand
    ): Promise<BusinessResult<null>> {
        const data = await this.getById(command.id);
        const filePath = data.data?.background;

        const response = await super.delete(command);
        if (response.status === 1 && filePath) {
            await this.deleteImage(filePath);
        }

        return response;
    };
}

export const albumService = new AlbumService();
