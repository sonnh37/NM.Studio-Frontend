import { UserContext } from "./user-context";

export interface TokenResult {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
  user: UserContext
}
