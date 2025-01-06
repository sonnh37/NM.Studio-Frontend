import {Product, ProductRepresentativeByCategory} from "@/types/product";
import {BaseService} from "./base-service";
import {Const} from "@/lib/constants/const";
import {BusinessResult} from "@/types/response/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";

class ProductService extends BaseService<Product> {
    constructor() {
        super(`${Const.PRODUCT}`);
    }

    public fetchRepresentativeByCategory = (): Promise<BusinessResult<ResultsResponse<ProductRepresentativeByCategory>>> => {
        return axiosInstance
            .get<BusinessResult<ResultsResponse<ProductRepresentativeByCategory>>>(`${this.endpoint}/representative-by-category`)
            .then(response => {
                return response.data; // Đảm bảo rằng nó trả về dữ liệu
            })
            .catch(error => {
                return this.handleError(error); // Xử lý lỗi
            });
    }

}

export const productService = new ProductService();
