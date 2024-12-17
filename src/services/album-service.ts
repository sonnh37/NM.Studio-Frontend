import {Album} from "@/types/album";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";
import { BusinessResult } from "@/types/response/business-result";
import { AlbumCreateCommand, AlbumUpdateCommand } from "@/types/commands/album-command";
import axiosInstance from "@/lib/axios-instance";

class AlbumService extends BaseService<Album> {
    constructor() {
        super(`${Const.ALBUM}`);
    }

    public create = async (
        command: CreateCommand
      ): Promise<BusinessResult<Album>> => {
        let link = null;
        if (command.file) {
          link = await this.uploadImage(command.file, "Album");
        }
    
        const command_ = {
          ...command,
        } as AlbumCreateCommand;
    
        command_.background = link ?? undefined;
    
        return axiosInstance
          .post<BusinessResult<Album>>(this.endpoint, command_)
          .then((response) => response.data)
          .catch((error) => this.handleError(error)); // Xử lý lỗi
      };
    
      public update = async (
        command: UpdateCommand
      ): Promise<BusinessResult<Album>> => {
        let link = null;
        if (command.file) {
          link = await this.uploadImage(command.file, "Album");
        }
    
        const command_ = {
          ...command,
        } as AlbumUpdateCommand;
    
        command_.background = link ?? command_.background;
        command_.isDeleted = undefined;
    
        return axiosInstance
          .put<BusinessResult<Album>>(this.endpoint, command_)
          .then((response) => response.data)
          .catch((error) => this.handleError(error)); // Xử lý lỗi
      };
}

export const albumService = new AlbumService();
