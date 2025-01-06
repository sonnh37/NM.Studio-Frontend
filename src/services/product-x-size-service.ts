import {ProductXSize} from "@/types/product-x-size";
import {BaseService} from "./base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/response/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {ProductXSizeUpdateCommand} from "@/types/commands/product-x-size-command";

class ProductXSizeService extends BaseService<ProductXSize> {
    constructor() {
        super(`${Const.PRODUCT_X_SIZE}`);
    }

    public delete_ = (query?: ProductXSizeUpdateCommand): Promise<BusinessResult<null>> => {
        const params = query ? {...query} : {};
        return axiosInstance
            .delete<BusinessResult<null>>(`${this.endpoint}`, {params})
            .then((response) => response.data)
            .catch((error) => this.handleError(error)); // Xử lý lỗi
    };
}

export const productXSizeService = new ProductXSizeService();
