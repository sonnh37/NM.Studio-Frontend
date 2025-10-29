import { Const } from "@/lib/constants/const";
import { MediaBase } from "@/types/entities/media-base";
import { BaseService } from "./base/base-service";

class MediaBaseService extends BaseService<MediaBase> {
  constructor() {
    super(`${Const.MEDIA_BASES}`);
  }
  // async deletePermanently(
  //   command: MediaBaseDeleteCommand
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

export const mediaBaseService = new MediaBaseService();
