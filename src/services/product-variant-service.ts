import { Constants } from "@/lib/constants/constants";
import { ProductVariant } from "@/types/entities/product-variant";
import { BaseService } from "./base/base-service";
import {
  ProductVariantCreateCommand,
  ProductVariantUpdateStatusCommand,
} from "@/types/cqrs/commands/product-variant-command";
import { BusinessResult } from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";

class ProductVariantService extends BaseService<ProductVariant> {
  constructor() {
    super(`${Constants.PRODUCT_VARIANTS}`);
  }

  async createList(
    commands: ProductVariantCreateCommand[]
  ): Promise<BusinessResult<ProductVariant[]>> {
    const res = await axiosInstance.post<BusinessResult<ProductVariant[]>>(
      `${this.endpoint}/list`,
      commands
    );
    return res.data;
  }

  async updateStatus(
    command: ProductVariantUpdateStatusCommand
  ): Promise<BusinessResult<ProductVariant>> {
    const res = await axiosInstance.put<BusinessResult<ProductVariant>>(
      `${this.endpoint}/status`,
      command
    );
    return res.data;
  }
}

export const productVariantService = new ProductVariantService();
