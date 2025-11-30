import {
  Product,
  ProductPreview,
  ProductRepresentativeByCategory,
} from "@/types/entities/product";
import { BaseService } from "./base/base-service";
import { Constants } from "@/lib/constants/constants";
import { BusinessResult } from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { QueryResult } from "@/types/models/query-result";
import { ProductGetAllQuery } from "@/types/cqrs/queries/product-query";
import { ProductUpdateStatusCommand } from "@/types/cqrs/commands/product-command";

import {cleanQueryParams} from "@/lib/utils/query-param-utils";

class ProductService extends BaseService<Product> {
  constructor() {
    super(`${Constants.PRODUCTS}`);
  }

  async getRepresentativeByCategory(): Promise<
    BusinessResult<ProductRepresentativeByCategory[]>
  > {
    const res = await axiosInstance.get<
      BusinessResult<ProductRepresentativeByCategory[]>
    >(`${this.endpoint}/representative-by-category`);
    return res.data;
  }

  async getReviewBySlug(slug: string): Promise<BusinessResult<ProductPreview>> {
    const cleanedQuery = cleanQueryParams({ slug });

    const res = await axiosInstance.get<BusinessResult<ProductPreview>>(
      `${this.endpoint}/preview/by-slug?${cleanedQuery}`
    );
    return res.data;
  }

  async getAllPreview(
    query?: ProductGetAllQuery
  ): Promise<BusinessResult<QueryResult<ProductPreview>>> {
    const cleanedQuery = cleanQueryParams(query);
    const res = await axiosInstance.get<
      BusinessResult<QueryResult<ProductPreview>>
    >(`${this.endpoint}/preview?${cleanedQuery}`);
    return res.data;
  }

  async updateStatus(
    command: ProductUpdateStatusCommand
  ): Promise<BusinessResult<Product>> {
    const res = await axiosInstance.put<BusinessResult<Product>>(
      `${this.endpoint}/status`,
      command
    );
    return res.data;
  }
}

export const productService = new ProductService();
