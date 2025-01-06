import {Album} from "@/types/album";
import {BaseService} from "./base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/response/business-result";
import {AlbumCreateCommand, AlbumUpdateCommand,} from "@/types/commands/album-command";
import axiosInstance from "@/lib/interceptors/axios-instance";

class AlbumService extends BaseService<Album> {
    constructor() {
        super(`${Const.ALBUM}`);
    }

    public create = async (
        command: AlbumCreateCommand
    ): Promise<BusinessResult<Album>> => {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "Album");
        }

        command.background = link ?? undefined;

        return axiosInstance
            .post<BusinessResult<Album>>(this.endpoint, command)
            .then((response) => response.data)
            .catch((error) => this.handleError(error)); // Xử lý lỗi
    };

    public update = async (
        command: AlbumUpdateCommand
    ): Promise<BusinessResult<Album>> => {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "Album");
        }

        if (link && command.background) {
            await this.deleteImage(command.background);
        }

        command.background = link ?? command.background;
        return axiosInstance
            .put<BusinessResult<Album>>(this.endpoint, command)
            .then((response) => response.data)
            .catch((error) => this.handleError(error)); // Xử lý lỗi
    };

    public deletePermanent = async (
        id: string
    ): Promise<BusinessResult<null>> => {
        try {
            const data = await this.fetchById(id);
            const filePath = data.data?.background;

            // Gọi API xóa trên backend
            const response = await axiosInstance
                .delete<BusinessResult<null>>(
                    `${this.endpoint}?id=${id}&isPermanent=true`
                )
                .then((res) => res.data);

            // Nếu backend xóa thành công và có filePath, xóa file trên Firebase
            if (response.status === 1 && filePath) {
                await this.deleteImage(filePath);
            }

            return response;
        } catch (error) {
            return this.handleError(error); // Xử lý lỗi
        }
    };
}

export const albumService = new AlbumService();
