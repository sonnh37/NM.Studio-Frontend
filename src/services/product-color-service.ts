import { Const } from "@/lib/constants/const";
import { ProductColor } from "@/types/entities/product-color";
import { BaseService } from "./base/base-service";

class ProductColorService extends BaseService<ProductColor> {
  constructor() {
    super(`${Const.PRODUCT_COLORS}`);
  }
}

export const productColorService = new ProductColorService();
