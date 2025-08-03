import { Const } from "@/lib/constants/const";
import { ProductSize } from "@/types/entities/product-size";
import { BaseService } from "./base/base-service";

class ProductSizeService extends BaseService<ProductSize> {
  constructor() {
    super(`${Const.PRODUCT_SIZES}`);
  }
}

export const productSizeService = new ProductSizeService();
