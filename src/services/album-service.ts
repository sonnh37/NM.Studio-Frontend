import { Album } from "@/types/entities/album";
import { BaseService } from "./base/base-service";
import { Const } from "@/lib/constants/const";
import { BusinessResult, Status } from "@/types/models/business-result";
import {
  AlbumCreateCommand,
  AlbumUpdateCommand,
  AlbumDeleteCommand,
} from "@/types/cqrs/commands/album-command";
import { CreateOrUpdateCommand } from "@/types/cqrs/commands/base/base-command";
import { mediaUploadService } from "./media-upload-service";

class AlbumService extends BaseService<Album> {
  constructor() {
    super(`${Const.ALBUMS}`);
  }
  // async deletePermanently(
  //   command: AlbumDeleteCommand
  // ): Promise<BusinessResult<null>> {
  //   const data = await this.getById(command.id);
  //   const filePath = data.data?.background;

  //   const response = await super.delete(command);
  //   if (response.status === 1 && filePath) {
  //     await this.deleteImage(filePath);
  //   }

  //   return response;
  // }
}

export const albumService = new AlbumService();
