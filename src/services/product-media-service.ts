import { Constants } from "@/lib/constants/constants";
import { ProductMedia } from "@/types/entities/product-media";
import { BaseService } from "./base/base-service";
import {
  ProductMediaCreateCommand,
  ProductMediaDeleteCommand,
} from "@/types/cqrs/commands/product-media-command";
import { BusinessResult } from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { cleanQueryParams } from "@/lib/utils/query-param-utils";

class ProductMediaService extends BaseService<ProductMedia> {
  constructor() {
    super(`${Constants.PRODUCT_MEDIAS}`);
  }

  async createList(
    commands: ProductMediaCreateCommand[]
  ): Promise<BusinessResult<ProductMedia[]>> {
    const res = await axiosInstance.post<BusinessResult<ProductMedia[]>>(
      `${this.endpoint}/list`,
      commands
    );
    return res.data;
  }

  async deleteList(
    commands: ProductMediaDeleteCommand[]
  ): Promise<BusinessResult<null>> {
    const cleanedQuery = cleanQueryParams(commands);
    const res = await axiosInstance.delete<BusinessResult<null>>(
      `${this.endpoint}/list`,
      { data: commands }
    );
    return res.data;
  }
}

export const productMediaService = new ProductMediaService();
