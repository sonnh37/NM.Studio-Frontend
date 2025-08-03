import {Blog} from "@/types/entities/blog";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/response/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {BlogCreateCommand, BlogDeleteCommand, BlogUpdateCommand} from "@/types/commands/blog-command";

class BlogService extends BaseService<Blog> {
    constructor() {
        super(`${Const.BLOGS}`);
    }

    async create(command: BlogCreateCommand): Promise<BusinessResult<Blog>> {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "Blog");
        }

        command.thumbnail = link ?? undefined;

        return await super.create(command);
    }

    async update(
        command: BlogUpdateCommand
    ): Promise<BusinessResult<Blog>> {
        let link = null;
        if (command.file) {
            link = await this.uploadImage(command.file, "Blog");
        }

        if (link && command.thumbnail) {
            await this.deleteImage(command.thumbnail);
        }

        command.thumbnail = link ?? command.thumbnail;

        const res = await axiosInstance.put<BusinessResult<Blog>>(this.endpoint, command);
        return res.data;
    };

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
    };
}

export const blogService = new BlogService();
