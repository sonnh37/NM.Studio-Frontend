import {Photo} from "@/types/photo";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";
import { BusinessResult } from "@/types/response/business-result";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";
import { PhotoCreateCommand, PhotoUpdateCommand } from "@/types/commands/photo-command";
import axiosInstance from "@/lib/axios-instance";

class PhotoService extends BaseService<Photo> {
    constructor() {
        super(`${Const.PHOTO}`);
    }

    public create = async (
      command: PhotoCreateCommand
    ): Promise<BusinessResult<Photo>> => {
      let link = null;
      if (command.file) {
        link = await this.uploadImage(command.file, "Photo");
      }
  
      command.src = link ?? undefined;
      command.title = command.title ?? (link ?? undefined);

  
      return axiosInstance
        .post<BusinessResult<Photo>>(this.endpoint, command)
        .then((response) => response.data)
        .catch((error) => this.handleError(error)); // Xử lý lỗi
    };
  
    public update = async (
      command: PhotoUpdateCommand
    ): Promise<BusinessResult<Photo>> => {
      let link = null;
      if (command.file) {
        link = await this.uploadImage(command.file, "Photo");
      }
  
      if (link && command.src) {
        await this.deleteImage(command.src);
      }
  
      command.src = link ?? command.src;
  
      return axiosInstance
        .put<BusinessResult<Photo>>(this.endpoint, command)
        .then((response) => response.data)
        .catch((error) => this.handleError(error)); // Xử lý lỗi
    };
}

export const photoService = new PhotoService();
