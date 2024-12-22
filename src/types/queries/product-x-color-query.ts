import { ProductStatus } from "../product";
import { BaseQueryableQuery } from "./base-query";

export interface ProductXColorGetAllQuery extends BaseQueryableQuery {
  productId?: string | null | undefined;
  colorId?: string | null | undefined;
  isActive?: boolean;
}
