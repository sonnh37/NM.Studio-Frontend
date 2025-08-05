"use client";
import {AlbumForm} from "@/components/sites/dashboard/sites/albums/create-update-form";
import {useEffect, useState} from "react";
import {Album} from "@/types/entities/album";
import {albumService} from "@/services/album-service";
import {toast} from "sonner";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const {
        data = {} as Album,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["fetchAlbumById", params.albumId],
        queryFn: async () => {
            const response = await albumService.getById(
                params.albumId as string
            );
            return response.data;
        },
        enabled: !!params.albumId,
    });

    if (isLoading) return <LoadingPageComponent/>;

    if (isError) {
        console.log("Error fetching:", error);
        return <ErrorSystem/>;
    }

    return (
        <div className="space-y-6">
            <AlbumForm initialData={data}/>
        </div>
    );
}
