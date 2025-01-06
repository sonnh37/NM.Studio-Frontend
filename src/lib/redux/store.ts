// store/store.ts
import {configureStore} from '@reduxjs/toolkit';
import widthsSlice from '@/lib/redux/slices/widthsSlice';
import photosSlice from "@/lib/redux/slices/photosSlice";
import chatSlice from "@/lib/redux/slices/chatSlice";
import userSlice from "@/lib/redux/slices/userSlice";
import tokenReducer from '@/lib/redux/slices/tokenSlice';

const store = configureStore({
    reducer: {
        widths: widthsSlice,
        photos: photosSlice,
        chat: chatSlice,
        user: userSlice,
        token: tokenReducer
    },
});

// Định nghĩa RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;