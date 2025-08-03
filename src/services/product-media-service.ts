import { Const } from "@/lib/constants/const";
import { ProductMedia } from "@/types/entities/product-media";
import { BaseService } from "./base/base-service";

class ProductMediaService extends BaseService<ProductMedia> {
  constructor() {
    super(`${Const.PRODUCT_MEDIAS}`);
  }
}

export const productMediaService = new ProductMediaService();
