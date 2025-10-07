import { Image } from "@/types/entities/image";
import { BaseService } from "./base/base-service";
import { Const } from "@/lib/constants/const";
import { BusinessResult } from "@/types/models/business-result";
import {
  ImageCreateCommand,
  ImageUpdateCommand,
} from "@/types/cqrs/commands/image-command";
import axiosInstance from "@/lib/interceptors/axios-instance";

class ImageService extends BaseService<Image> {
  constructor() {
    super(`${Const.IMAGES}`);
  }

  // async create(command: ImageCreateCommand): Promise<BusinessResult<Image>> {
  //     let link = null;
  //     if (command.file) {
  //         link = await this.uploadImage(command.file, "Image");
  //     }
  //
  //     command.src = link ?? undefined;
  //
  //     return await super.create(command);
  // }
  //
  // async update(
  //     command: ImageUpdateCommand
  // ): Promise<BusinessResult<Image>> {
  //     let link = null;
  //     if (command.file) {
  //         link = await this.uploadImage(command.file, "Image");
  //     }
  //
  //     if (link && command.src) {
  //         await this.deleteImage(command.src);
  //     }
  //
  //     command.src = link ?? command.src;
  //
  //     const res = await axiosInstance.put<BusinessResult<Image>>(this.endpoint, command);
  //     return res.data;
  // };
}

export const imageService = new ImageService();
