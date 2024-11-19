"use client";
import {Photo} from "@/types/photo";
import {useEffect, useState} from "react";
import {photoService} from "@/services/photo-service";
import {toast} from "sonner";
import {PhotoForm} from "@/components/dashboard/sections/photos/create-update-form";

export default function Page({params}: { params: { photoId: string } }) {
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await photoService.fetchById(params.photoId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setPhoto(response.data as Photo); // Assuming response.data contains the photo data
        };
        fetchData();
    }, [params.photoId]);

    return (
        <div className="space-y-6">
            <PhotoForm initialData={photo}/>
        </div>
    );
}
