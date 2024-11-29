import {ProductXPhoto} from "@/types/product-x-photo";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";
import {BusinessResult} from "@/types/response/business-result";
import axiosInstance from "@/lib/axios-instance";
import { ProductXPhotoUpdateCommand } from "@/types/commands/product-x-photo-command";

class ProductXPhotoService extends BaseService<ProductXPhoto> {
    constructor() {
        super(`${Const.PRODUCT_X_PHOTO}`);
    }

    public delete_ = (query?: ProductXPhotoUpdateCommand): Promise<BusinessResult<null>> => {
        const params = query ? {...query} : {};
        return axiosInstance
            .delete<BusinessResult<null>>(`${this.endpoint}`, {params})
            .then((response) => response.data)
            .catch((error) => this.handleError(error)); // Xử lý lỗi
    };
}

export const productXPhotoService = new ProductXPhotoService();
