import {ProductXColor} from "@/types/product-x-color";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";
import {BusinessResult} from "@/types/response/business-result";
import axiosInstance from "@/lib/axios-instance";
import {ProductXColorUpdateCommand} from "@/types/commands/product-x-color-command";

class ProductXColorService extends BaseService<ProductXColor> {
    constructor() {
        super(`${Const.PRODUCT_X_COLOR}`);
    }

    public delete_ = (query?: ProductXColorUpdateCommand): Promise<BusinessResult<null>> => {
        const params = query ? {...query} : {};
        return axiosInstance
            .delete<BusinessResult<null>>(`${this.endpoint}`, {params})
            .then((response) => response.data)
            .catch((error) => this.handleError(error)); // Xử lý lỗi
    };
}

export const productXColorService = new ProductXColorService();
