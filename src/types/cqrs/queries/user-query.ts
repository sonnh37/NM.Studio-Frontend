import { GetQueryableQuery } from "./base/base-query";

export interface UserGetAllQuery extends GetQueryableQuery {
  email?: string | null;
  fullName?: string | null;
}
