import userSerice from '@/services/user-serice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  const response = await userSerice.getToken();
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
        localStorage.setItem('token', action.payload ?? '');
      }
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
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
        localStorage.setItem('token', action.payload ?? '');
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch token';
      });
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;