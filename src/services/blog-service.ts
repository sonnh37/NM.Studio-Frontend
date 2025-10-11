import { Blog } from "@/types/entities/blog";
import { BaseService } from "./base/base-service";
import { Const } from "@/lib/constants/const";
import { BusinessResult, Status } from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {
  BlogCreateCommand,
  BlogDeleteCommand,
  BlogUpdateCommand,
} from "@/types/cqrs/commands/blog-command";
import { CreateOrUpdateCommand } from "@/types/cqrs/commands/base/base-command";
import { mediaUploadService } from "./media-upload-service";
import { UploadResult } from "@/types/models/upload-result";

class BlogService extends BaseService<Blog> {
  constructor() {
    super(`${Const.BLOGS}`);
  }

 
}

export const blogService = new BlogService();
