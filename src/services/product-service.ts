import {Product, ProductRepresentativeByCategory} from "@/types/entities/product";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import {QueryResult} from "@/types/models/query-result";

class ProductService extends BaseService<Product> {
    constructor() {
        super(`${Const.PRODUCTS}`);
    }

    async getRepresentativeByCategory(): Promise<BusinessResult<ProductRepresentativeByCategory[]>> {
        const res = await axiosInstance
            .get<BusinessResult<ProductRepresentativeByCategory[]>>(`${this.endpoint}/representative-by-category`);
        return res.data;

    }

}

export const productService = new ProductService();
