import { Const } from "@/lib/constants/const";
import { ProductVariant } from "@/types/entities/product-variant";
import { BaseService } from "./base/base-service";

class ProductVariantService extends BaseService<ProductVariant> {
  constructor() {
    super(`${Const.PRODUCT_VARIANTS}`);
  }
}

export const productVariantService = new ProductVariantService();
