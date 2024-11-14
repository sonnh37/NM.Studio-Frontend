'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Photo} from '@/types/photo';
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Product, ProductXPhoto} from "@/types/product";
import {Breadcrumbs} from "@/components/common/breadcrumb";
import {ContentLayout} from "@/components/dashboard/common/content-layout";
import DataOnlyTablePhotos from "@/components/dashboard/tables/products/photos";
import {useRefresh} from "@/components/dashboard/refresh-context"; // Đảm bảo bạn đã định nghĩa kiểu Photo

export default function Page({params}: { params: { productId: string } }) {
    const [photoInProducts, setPhotoInProducts] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [photoRemains, setPhotoRemains] = useState<Photo[]>([]);
    const [productXPhotos, setProductXPhotos] = useState<ProductXPhoto[] | undefined>(undefined);

    const [queryParams, setQueryParams] = useState<PhotoGetAllQuery>({isPagination: false});
    const {setRefresh} = useRefresh();

    const refresh = async () => {
        try {
            const [productResponse, photosResponse] = await Promise.all([
                fetchProduct(params.productId),
                fetchPhotos(queryParams),
            ]);

            setPhotos(photosResponse.results ?? []);
            setProductXPhotos(productResponse.result?.productXPhotos);
        } catch (error: any) {
            console.error('Failed to refresh data', error.response?.data || error.message);
        }
    };

    // refresh override in context
    useEffect(() => {
        setRefresh(() => refresh);
    }, [setRefresh, params.productId, queryParams]);

    useEffect(() => {
        refresh();
    }, [params.productId, queryParams]);

    useEffect(() => {
        const photosInProduct = productXPhotos
            ? productXPhotos.map((x) => x.photo).filter((photo): photo is Photo => photo !== undefined)
            : [];

        setPhotoInProducts(photosInProduct);
    }, [productXPhotos]);

    useEffect(() => {
        const remainingPhotos = photos.filter(photo => !photoInProducts.some(productPhoto => productPhoto.id === photo.id));
        setPhotoRemains(remainingPhotos);
    }, [photos, photoInProducts]);

    const handleDeletePhoto = async (photo: Photo) => {
        const productXPhotoCommand_: Partial<ProductXPhoto> = {
            productId: params.productId,
            photoId: photo.id
        }
        try {
            const queryParams = new URLSearchParams(productXPhotoCommand_ as any).toString();

            await axios.delete(`https://localhost:7192/products/productXPhotos?${queryParams}`);
            const productResponse = await fetchProduct(params.productId);
            setProductXPhotos(productResponse.result?.productXPhotos);
        } catch (error: any) {
            console.error('Failed to delete photo', error.response?.data || error.message);
        }
    };

    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Product", link: "/dashboard/product"},
        {title: `${params.productId}`, link: `/dashboard/product/${params.productId}`},
        {title: `photos`, link: `/dashboard/product/${params.productId}/photos`},
    ];

    return (
        <ContentLayout title="Product">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Photos in Product</h2>
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
                            {photoInProducts

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
                        <h3 className="text-lg font-bold mb-2">Add Photos to Product</h3>
                        <DataOnlyTablePhotos photos={photoRemains}/>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
};
