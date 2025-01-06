"use client";
import {AlbumForm} from "@/components/dashboard/sites/albums/create-update-form";
import {useEffect, useState} from "react";
import {Album} from "@/types/album";
import {albumService} from "@/services/album-service";
import {toast} from "sonner";

export default function Page({params}: { params: { albumId: string } }) {
    const [album, setAlbum] = useState<Album | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await albumService.fetchById(params.albumId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setAlbum(response.data as Album); // Assuming response.data contains the album data
        };
        fetchData();
    }, [params.albumId]);

    return (
        <div className="space-y-6">
            <AlbumForm initialData={album}/>
        </div>
    );
}
