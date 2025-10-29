import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlbumImageUpdateCommand} from "@/types/commands/album-media-command";

interface PhotosState {
    selectedAlbumImages: AlbumImageUpdateCommand[];
}

const initialState: PhotosState = {
    selectedAlbumImages: [],
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setSelectedAlbumImages(state, action: PayloadAction<AlbumImageUpdateCommand[]>) {
            state.selectedAlbumImages = action.payload;
        },
        addSelectedPhoto(state, action: PayloadAction<AlbumImageUpdateCommand>) {
            state.selectedAlbumImages.push(action.payload);
        },
        removeSelectedPhoto(state, action: PayloadAction<string>) {
            state.selectedAlbumImages = state.selectedAlbumImages.filter(mediaBase => mediaBase.photoId !== action.payload);
        },
    },
});

export const {setSelectedAlbumImages, addSelectedPhoto, removeSelectedPhoto} = photosSlice.actions;

export default photosSlice.reducer;
