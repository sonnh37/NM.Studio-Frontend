// contextHelper.ts

import { UserContext } from "@/types/models/user-context";

const CONTEXT_KEY = "current_user_context";

export const userContextHelper = {
  save: (user: UserContext) => {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(user));
  },

  get: (): UserContext | null => {
    const data = localStorage.getItem(CONTEXT_KEY);
    return data ? (JSON.parse(data) as UserContext) : null;
  },

  clear: () => {
    localStorage.removeItem(CONTEXT_KEY);
  },

  getId: (): string | null => {
    const ctx = userContextHelper.get();
    return ctx?.id ?? null;
  },

  isLoggedIn: (): boolean => {
    return !!userContextHelper.get();
  },
};
