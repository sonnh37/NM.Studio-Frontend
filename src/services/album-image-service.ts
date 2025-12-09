import axiosInstance from "@/lib/interceptors/axios-instance";
import { BaseService } from "./base/base-service";
import { Constants } from "@/lib/constants/constants";
import {
  AlbumImageCreateCommand,
  AlbumImageDeleteCommand,
} from "@/types/cqrs/commands/album-media-command";
import { AlbumImage } from "@/types/entities/album-image";
import { BusinessResult } from "@/types/models/business-result";
import { cleanQueryParams } from "@/lib/utils/query-param-utils";

class AlbumImageService extends BaseService<AlbumImage> {
  constructor() {
    super(`${Constants.ALBUM_IMAGES}`);
  }

  async createList(
    commands: AlbumImageCreateCommand[]
  ): Promise<BusinessResult<AlbumImage[]>> {
    const res = await axiosInstance.post<BusinessResult<AlbumImage[]>>(
      `${this.endpoint}/list`,
      commands
    );
    return res.data;
  }

  async deleteList(
    commands: AlbumImageDeleteCommand[]
  ): Promise<BusinessResult<null>> {
    const cleanedQuery = cleanQueryParams(commands);
    const res = await axiosInstance.delete<BusinessResult<null>>(
      `${this.endpoint}/list`,
      { data: commands }
    );
    return res.data;
  }
}

export const albumImageService = new AlbumImageService();
