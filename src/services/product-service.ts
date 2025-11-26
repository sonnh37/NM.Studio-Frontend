import {
  Product,
  ProductPreview,
  ProductRepresentativeByCategory,
} from "@/types/entities/product";
import { BaseService } from "./base/base-service";
import { Const } from "@/lib/constants/const";
import { BusinessResult } from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";
import { QueryResult } from "@/types/models/query-result";
import { cleanQueryParams } from "@/lib/utils";
import { ProductGetAllQuery } from "@/types/cqrs/queries/product-query";

class ProductService extends BaseService<Product> {
  constructor() {
    super(`${Const.PRODUCTS}`);
  }

  async getRepresentativeByCategory(): Promise<
    BusinessResult<ProductRepresentativeByCategory[]>
  > {
    const res = await axiosInstance.get<
      BusinessResult<ProductRepresentativeByCategory[]>
    >(`${this.endpoint}/representative-by-category`);
    return res.data;
  }

  async getBySlug(slug: string): Promise<BusinessResult<Product>> {
    const cleanedQuery = cleanQueryParams({ slug });

    const res = await axiosInstance.get<BusinessResult<Product>>(
      `${this.endpoint}/by-slug?${cleanedQuery}`
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
}

export const productService = new ProductService();
