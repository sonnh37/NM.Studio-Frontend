import {Blog} from "@/types/blog";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";

class BlogService extends BaseService<Blog> {
    constructor() {
        super(`${Const.BLOG}`);
    }
}

export const blogService = new BlogService();
