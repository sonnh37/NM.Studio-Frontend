// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  token: any | null;
  user: any | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

// load từ localStorage
const saved = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
if (saved) {
  Object.assign(initialState, JSON.parse(saved));
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: any; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

// actions
export const { setAuth, clearAuth } = authSlice.actions;

// selector
export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
