import { Album } from "@/types/album";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";
import { BusinessResult } from "@/types/response/business-result";
import {
  AlbumCreateCommand,
  AlbumUpdateCommand,
} from "@/types/commands/album-command";
import axiosInstance from "@/lib/axios-instance";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";

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

    if (link && command_.background) {
      await this.deleteImage(command_.background);
    }
    command_.background = link ?? command_.background;
    command_.isDeleted = undefined;

    return axiosInstance
      .put<BusinessResult<Album>>(this.endpoint, command_)
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
