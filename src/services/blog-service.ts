import { Blog } from "@/types/entities/blog";
import { BaseService } from "./base/base-service";
import { Const } from "@/lib/constants/const";
import { BusinessResult } from "@/types/response/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  BlogCreateCommand,
  BlogDeleteCommand,
  BlogUpdateCommand,
} from "@/types/commands/blog-command";

class BlogService extends BaseService<Blog> {
  constructor() {
    super(`${Const.BLOGS}`);
  }

  async create(command: BlogCreateCommand): Promise<BusinessResult<Blog>> {
    await this.handleFiles(
      command,
      [
        { fileKey: "file_thumbnail", urlKey: "thumbnail" },
        { fileKey: "file_bannerImage", urlKey: "bannerImage" },
      ],
      "Blog",
      false
    );
    return super.create(command);
  }

  async update(command: BlogUpdateCommand): Promise<BusinessResult<Blog>> {
    await this.handleFiles(
      command,
      [
        { fileKey: "file_thumbnail", urlKey: "thumbnail" },
        { fileKey: "file_bannerImage", urlKey: "bannerImage" },
      ],
      "Blog",
      true
    );
    return super.update(command);
  }

  async deletePermanently(
    command: BlogDeleteCommand
  ): Promise<BusinessResult<null>> {
    const data = await this.getById(command.id);
    const filePath = data.data?.thumbnail;

    const response = await super.delete(command);
    if (response.status === 1 && filePath) {
      await this.deleteImage(filePath);
    }

    return response;
  }
}

export const blogService = new BlogService();
