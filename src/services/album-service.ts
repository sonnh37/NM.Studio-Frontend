import { Constants } from "@/lib/constants/constants";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  AlbumSetCoverUpdateCommand,
  AlbumWithImagesCreateCommand,
} from "@/types/cqrs/commands/album-command";
import { Album } from "@/types/entities/album";
import { BusinessResult } from "@/types/models/business-result";
import { BaseService } from "./base/base-service";

import {cleanQueryParams} from "@/lib/utils/query-param-utils";

class AlbumService extends BaseService<Album> {
  constructor() {
    super(`${Constants.ALBUMS}`);
  }
  async getBySlug(slug: string): Promise<BusinessResult<Album>> {
    const cleanedQuery = cleanQueryParams({ slug });

    const res = await axiosInstance.get<BusinessResult<Album>>(
      `${this.endpoint}/by-slug?${cleanedQuery}`
    );
    return res.data;
  }

  async createWithImages(
    command: AlbumWithImagesCreateCommand
  ): Promise<BusinessResult<void>> {
    const res = await axiosInstance.post<BusinessResult<void>>(
      `${this.endpoint}/images`,
      command
    );
    return res.data;
  }
  async setCoverAlbum(
    command: AlbumSetCoverUpdateCommand
  ): Promise<BusinessResult<void>> {
    const res = await axiosInstance.put<BusinessResult<void>>(
      `${this.endpoint}/images/set-cover`,
      command
    );
    return res.data;
  }
}

export const albumService = new AlbumService();
