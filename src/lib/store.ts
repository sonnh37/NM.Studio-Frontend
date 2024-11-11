// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import widthsSlice from './slices/widthsSlice';

const store = configureStore({
  reducer: {
    widths: widthsSlice,
  },
});

// Định nghĩa RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;