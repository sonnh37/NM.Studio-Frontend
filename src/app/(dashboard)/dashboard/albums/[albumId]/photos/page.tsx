'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Photo} from '@/types/photo';
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Album, AlbumXPhoto} from "@/types/album";
import {Breadcrumbs} from "@/components/client/common/breadcrumb";
import {ContentLayout} from "@/components/dashboard/common/content-layout";
import DataOnlyTablePhotos from "@/components/dashboard/tables/albums/photos";
import {useRefresh} from "@/components/dashboard/refresh-context"; // Đảm bảo bạn đã định nghĩa kiểu Photo
import { albumService } from '@/services/album-service';
import { photoService } from '@/services/photo-service';

export default function Page({params}: { params: { albumId: string } }) {
    const [photoInAlbums, setPhotoInAlbums] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [photoRemains, setPhotoRemains] = useState<Photo[]>([]);
    const [albumXPhotos, setAlbumXPhotos] = useState<AlbumXPhoto[] | undefined>(undefined);

    const [queryParams, setQueryParams] = useState<PhotoGetAllQuery>({isPagination: false});
    const {setRefresh} = useRefresh();

    const refresh = async () => {
        try {
            const [albumResponse, photosResponse] = await Promise.all([
                albumService.getById(params.albumId),
                photoService.fetchAll(queryParams),
            ]);

            setPhotos(photosResponse.results ?? []);
            setAlbumXPhotos(albumResponse.result?.albumXPhotos);
        } catch (error: any) {
            console.error('Failed to refresh data', error.response?.data || error.message);
        }
    };

    // refresh override in context
    useEffect(() => {
        setRefresh(() => refresh);
    }, [setRefresh, params.albumId, queryParams]);

    useEffect(() => {
        refresh();
    }, [params.albumId, queryParams]);

    useEffect(() => {
        const photosInAlbum = albumXPhotos
            ? albumXPhotos.map((x) => x.photo).filter((photo): photo is Photo => photo !== undefined)
            : [];

        setPhotoInAlbums(photosInAlbum);
    }, [albumXPhotos]);

    useEffect(() => {
        const remainingPhotos = photos.filter(photo => !photoInAlbums.some(albumPhoto => albumPhoto.id === photo.id));
        setPhotoRemains(remainingPhotos);
    }, [photos, photoInAlbums]);

    const handleDeletePhoto = async (photo: Photo) => {
        const albumXPhotoCommand_: Partial<AlbumXPhoto> = {
            albumId: params.albumId,
            photoId: photo.id
        }
        try {
            const queryParams = new URLSearchParams(albumXPhotoCommand_ as any).toString();

            await axios.delete(`https://localhost:7192/albums/albumXPhotos?${queryParams}`);
            const albumResponse = await albumService.getById(params.albumId);
            setAlbumXPhotos(albumResponse.result?.albumXPhotos);
        } catch (error: any) {
            console.error('Failed to delete photo', error.response?.data || error.message);
        }
    };

    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Album", link: "/dashboard/album"},
        {title: `${params.albumId}`, link: `/dashboard/album/${params.albumId}`},
        {title: `photos`, link: `/dashboard/album/${params.albumId}/photos`},
    ];

    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Photos in Album</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {photoInAlbums

                                .map((photo) => (
                                    <TableRow key={photo.id}>
                                        <TableCell>
                                            {photo.src &&
                                                <img src={photo.src} alt={photo.title}
                                                     className="w-12 h-12 object-cover"/>}
                                        </TableCell>
                                        <TableCell>{photo.title}</TableCell>
                                        <TableCell>{photo.description}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDeletePhoto(photo)} variant="outline"
                                                    color="red">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-2">Add Photos to Album</h3>
                        <DataOnlyTablePhotos photos={photoRemains}/>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
};


