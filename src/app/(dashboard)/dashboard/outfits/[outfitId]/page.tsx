"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {OutfitForm} from "@/components/dashboard/tables/outfits/create-update-form";
import {Outfit} from "@/types/outfit";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";

export default function Page({params}: { params: { outfitId: string } }) {
    const [outfit, setOutfit] = useState<Outfit | null>(null);

    useEffect(() => {
        if (params.outfitId) {
            axios.get(`https://localhost:7192/outfits/${params.outfitId}`)
                .then(response => {
                    setOutfit(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch outfit data', err);
                });
        }
    }, [params.outfitId]);

    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Outfit', link: '/dashboard/outfit'},
        {title: `${params.outfitId}`, link: `/dashboard/outfit/${params.outfitId}`}
    ];

    return (
        <ContentLayout title="Outfit">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <OutfitForm initialData={outfit}/>
            </div>
        </ContentLayout>
    );
}
