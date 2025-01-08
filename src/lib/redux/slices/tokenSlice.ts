import { userService } from "@/services/user-serice";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface TokenState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TokenState = {
  token: null,
  status: 'idle',
  error: null,
};

export const fetchToken = createAsyncThunk('token/fetchToken', async () => {
  const response = await userService.getToken();
  if (response.status === 1) {
    return response.data?.accessToken;
  } else {
    throw new Error('Failed to fetch token');
  }
});

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload ?? null;
      if (action.payload) {
        Cookies.set('token', action.payload ?? '', { expires: 7 });
      }
    },
    clearToken: (state) => {
      state.token = null;
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload ?? null;
        Cookies.set('token', action.payload ?? '');
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch token';
        Cookies.remove('token');
      });
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;