"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {AlbumForm} from "@/components/dashboard/tables/albums/create-update-form";
import {Album} from "@/types/album";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";
import { albumService } from "@/services/album-service";

export default function Page({params}: { params: { albumId: string } }) {
    const [album, setAlbum] = useState<Album | null>(null);

    useEffect(() => {
        const fetchAlbumData = async () => {
            if (params.albumId) {
                try {
                    const fetchedAlbum = await albumService.fetchAlbum(params.albumId);
                    setAlbum(fetchedAlbum.result ?? null); // Cập nhật album vào state
                } catch (error) {
                    console.error("Failed to fetch album:", error);
                }
            }
        };

        fetchAlbumData(); // Gọi hàm bất đồng bộ bên trong useEffect
    }, [params.albumId]);

    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Album", link: "/dashboard/album"},
        {title: `${params.albumId}`, link: `/dashboard/album/${params.albumId}`},
    ];

    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <AlbumForm initialData={album}/>
            </div>
        </ContentLayout>
    );
}
