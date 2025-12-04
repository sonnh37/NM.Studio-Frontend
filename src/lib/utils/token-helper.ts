import { TokenResult } from "@/types/models/token-result";

// tokenHelper.ts
const SESSION_KEY = "current_session";

export const tokenHelper = {
  save(token: TokenResult) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(token));
  },

  get(): TokenResult | null {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? (JSON.parse(data) as TokenResult) : null;
  },

  getAccessToken(): string | null {
    return this.get()?.accessToken ?? null;
  },

  getRefreshToken(): string | null {
    return this.get()?.refreshToken ?? null;
  },

  getExpireTime(): number | null {
    return this.get()?.expireTime ?? null;
  },

  clear() {
    localStorage.removeItem(SESSION_KEY);
  },
};
