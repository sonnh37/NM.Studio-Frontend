import { GetQueryableQuery } from "./base/base-query";

export interface RefreshTokenGetAllQuery extends GetQueryableQuery {
  userId?: string | null | undefined;
  token?: string | null | undefined;
  keyId?: string | null | undefined;
  publicKey?: string | null | undefined;
  userAgent?: string | null | undefined;
  ipAddress?: string | null | undefined;
  expiry?: string | null | undefined;
}
