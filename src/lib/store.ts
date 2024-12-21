// store/store.ts
import {configureStore} from '@reduxjs/toolkit';
import widthsSlice from '@/lib/slices/widthsSlice';
import photosSlice from "@/lib/slices/photosSlice";
import chatSlice from "@/lib/slices/chatSlice";
import userSlice from "@/lib/slices/userSlice";

const store = configureStore({
    reducer: {
        widths: widthsSlice,
        photos: photosSlice,
        chat: chatSlice,
        user: userSlice
    },
});

// Định nghĩa RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;