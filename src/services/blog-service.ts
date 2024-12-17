import { Blog } from "@/types/blog";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";
import { BusinessResult } from "@/types/response/business-result";
import axiosInstance from "@/lib/axios-instance";
import {
  BlogCreateCommand,
  BlogUpdateCommand,
} from "@/types/commands/blog-command";

class BlogService extends BaseService<Blog> {
  constructor() {
    super(`${Const.BLOG}`);
  }

  public create = async (
    command: CreateCommand
  ): Promise<BusinessResult<Blog>> => {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "Blog");
    }

    const command_ = {
      ...command,
    } as BlogCreateCommand;

    command_.thumbnail = link ?? undefined;

    return axiosInstance
      .post<BusinessResult<Blog>>(this.endpoint, command_)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public update = async (
    command: UpdateCommand
  ): Promise<BusinessResult<Blog>> => {
    let link = null;
    if (command.file) {
      link = await this.uploadImage(command.file, "Blog");
    }

    const command_ = {
      ...command,
    } as BlogUpdateCommand;

    if (link && command_.thumbnail) {
      await this.deleteImage(command_.thumbnail);
    }
    command_.thumbnail = link ?? command_.thumbnail;
    command_.isDeleted = undefined;

    return axiosInstance
      .put<BusinessResult<Blog>>(this.endpoint, command_)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public deletePermanent = async (
    id: string
  ): Promise<BusinessResult<null>> => {
    try {
      const data = await this.fetchById(id);
      const filePath = data.data?.thumbnail;

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

export const blogService = new BlogService();
