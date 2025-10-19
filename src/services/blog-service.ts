import { Const } from "@/lib/constants/const";
import { Blog } from "@/types/entities/blog";
import { BaseService } from "./base/base-service";

class BlogService extends BaseService<Blog> {
  constructor() {
    super(`${Const.BLOGS}`);
  }
}

export const blogService = new BlogService();
