// contextHelper.ts

import { UserContextResponse } from "@/types/models/user-context";

const CONTEXT_KEY = "current_user_context";

export const userContextHelper = {
  save: (user: UserContextResponse) => {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(user));
  },

  get: (): UserContextResponse | null => {
    const data = localStorage.getItem(CONTEXT_KEY);
    return data ? (JSON.parse(data) as UserContextResponse) : null;
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
