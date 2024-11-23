import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
    isOpen: boolean;
}

const initialState: ChatState = {
    isOpen: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        toggleChat: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleChat } = chatSlice.actions;
export default chatSlice.reducer;
