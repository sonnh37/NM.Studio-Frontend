import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlbumXPhotoUpdateCommand} from "@/types/commands/album-x-photo-command";

interface PhotosState {
    selectedAlbumXPhotos: AlbumXPhotoUpdateCommand[];
}

const initialState: PhotosState = {
    selectedAlbumXPhotos: [],
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setSelectedAlbumXPhotos(state, action: PayloadAction<AlbumXPhotoUpdateCommand[]>) {
            state.selectedAlbumXPhotos = action.payload;
        },
        addSelectedPhoto(state, action: PayloadAction<AlbumXPhotoUpdateCommand>) {
            state.selectedAlbumXPhotos.push(action.payload);
        },
        removeSelectedPhoto(state, action: PayloadAction<string>) {
            state.selectedAlbumXPhotos = state.selectedAlbumXPhotos.filter(photo => photo.photoId !== action.payload);
        },
    },
});

export const {setSelectedAlbumXPhotos, addSelectedPhoto, removeSelectedPhoto} = photosSlice.actions;

export default photosSlice.reducer;
