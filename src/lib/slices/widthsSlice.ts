import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    selectedWidths: [] as number[],
};

const widthsSlice = createSlice({
    name: 'widths',
    initialState,
    reducers: {
        setSelectedWidths(state, action: PayloadAction<number[]>) {
            state.selectedWidths = action.payload;
        },
        addSelectedWidth(state, action: PayloadAction<number>) {
            state.selectedWidths.push(action.payload);
        },
    },
});

export const {setSelectedWidths, addSelectedWidth} = widthsSlice.actions;

export default widthsSlice.reducer;
