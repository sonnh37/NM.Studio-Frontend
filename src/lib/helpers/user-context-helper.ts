// contextHelper.ts
import { userService } from "@/services/user-serice";
import { Status } from "@/types/models/business-result";
import { UserContext } from "@/types/models/user-context";
import { tokenHelper } from "./token-helper";

const CONTEXT_KEY = "current_user_context";

export const userContextHelper = {
  save: (user: UserContext) => {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(user));
  },

  get: (): UserContext | null => {
    const data = localStorage.getItem(CONTEXT_KEY);
    if (data) {
      return JSON.parse(data) as UserContext;
    }
    return null;
  },

  clear: () => {
    localStorage.removeItem(CONTEXT_KEY);
  },

  getId: (): string | null => {
    const ctx = userContextHelper.get();
    return ctx?.id ?? null;
  },

  // Sửa isLoggedIn để kiểm tra cả token
  isLoggedIn: (): boolean => {
    return !!tokenHelper.get() && !!userContextHelper.get();
  },

};