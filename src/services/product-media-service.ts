import { Constants } from "@/lib/constants/constants";
import { ProductMedia } from "@/types/entities/product-media";
import { BaseService } from "./base/base-service";

class ProductMediaService extends BaseService<ProductMedia> {
  constructor() {
    super(`${Constants.PRODUCT_MEDIAS}`);
  }
}

export const productMediaService = new ProductMediaService();
