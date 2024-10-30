'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Photo} from '@/types/photo';
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {fetchPhotos} from "@/services/photo-service";
import {fetchOutfit} from "@/services/outfit-service";
import {Outfit, OutfitXPhoto} from "@/types/outfit";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout";
import DataOnlyTablePhotos from "@/components/dashboard/tables/outfits/photos";
import {useRefresh} from "@/components/dashboard/refresh-context"; // Đảm bảo bạn đã định nghĩa kiểu Photo

export default function Page({params}: { params: { outfitId: string } }) {
    const [photoInOutfits, setPhotoInOutfits] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [photoRemains, setPhotoRemains] = useState<Photo[]>([]);
    const [outfitXPhotos, setOutfitXPhotos] = useState<OutfitXPhoto[] | undefined>(undefined);

    const [queryParams, setQueryParams] = useState<PhotoGetAllQuery>({isPagination: false});
    const {setRefresh} = useRefresh();

    const refresh = async () => {
        try {
            const [outfitResponse, photosResponse] = await Promise.all([
                fetchOutfit(params.outfitId),
                fetchPhotos(queryParams),
            ]);

            setPhotos(photosResponse.results ?? []);
            setOutfitXPhotos(outfitResponse.result?.outfitXPhotos);
        } catch (error: any) {
            console.error('Failed to refresh data', error.response?.data || error.message);
        }
    };

    // refresh override in context
    useEffect(() => {
        setRefresh(() => refresh);
    }, [setRefresh, params.outfitId, queryParams]);

    useEffect(() => {
        refresh();
    }, [params.outfitId, queryParams]);

    useEffect(() => {
        const photosInOutfit = outfitXPhotos
            ? outfitXPhotos.map((x) => x.photo).filter((photo): photo is Photo => photo !== undefined)
            : [];

        setPhotoInOutfits(photosInOutfit);
    }, [outfitXPhotos]);

    useEffect(() => {
        const remainingPhotos = photos.filter(photo => !photoInOutfits.some(outfitPhoto => outfitPhoto.id === photo.id));
        setPhotoRemains(remainingPhotos);
    }, [photos, photoInOutfits]);

    const handleDeletePhoto = async (photo: Photo) => {
        const outfitXPhotoCommand_: Partial<OutfitXPhoto> = {
            outfitId: params.outfitId,
            photoId: photo.id
        }
        try {
            const queryParams = new URLSearchParams(outfitXPhotoCommand_ as any).toString();

            await axios.delete(`https://localhost:7192/outfits/outfitXPhotos?${queryParams}`);
            const outfitResponse = await fetchOutfit(params.outfitId);
            setOutfitXPhotos(outfitResponse.result?.outfitXPhotos);
        } catch (error: any) {
            console.error('Failed to delete photo', error.response?.data || error.message);
        }
    };

    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Outfit", link: "/dashboard/outfit"},
        {title: `${params.outfitId}`, link: `/dashboard/outfit/${params.outfitId}`},
        {title: `photos`, link: `/dashboard/outfit/${params.outfitId}/photos`},
    ];

    return (
        <ContentLayout title="Outfit">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Photos in Outfit</h2>
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
                            {photoInOutfits

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
                        <h3 className="text-lg font-bold mb-2">Add Photos to Outfit</h3>
                        <DataOnlyTablePhotos photos={photoRemains}/>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
};
