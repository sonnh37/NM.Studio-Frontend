import { Constants } from "@/lib/constants/constants";
import { Blog } from "@/types/entities/blog";
import { BaseService } from "./base/base-service";

class BlogService extends BaseService<Blog> {
  constructor() {
    super(`${Constants.BLOGS}`);
  }
}

export const blogService = new BlogService();
