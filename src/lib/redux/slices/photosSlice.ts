import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlbumMediaUpdateCommand} from "@/types/commands/album-media-command";

interface PhotosState {
    selectedAlbumMedias: AlbumMediaUpdateCommand[];
}

const initialState: PhotosState = {
    selectedAlbumMedias: [],
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setSelectedAlbumMedias(state, action: PayloadAction<AlbumMediaUpdateCommand[]>) {
            state.selectedAlbumMedias = action.payload;
        },
        addSelectedPhoto(state, action: PayloadAction<AlbumMediaUpdateCommand>) {
            state.selectedAlbumMedias.push(action.payload);
        },
        removeSelectedPhoto(state, action: PayloadAction<string>) {
            state.selectedAlbumMedias = state.selectedAlbumMedias.filter(photo => photo.photoId !== action.payload);
        },
    },
});

export const {setSelectedAlbumMedias, addSelectedPhoto, removeSelectedPhoto} = photosSlice.actions;

export default photosSlice.reducer;
