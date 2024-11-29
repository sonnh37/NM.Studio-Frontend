"use client";
import {Size} from "@/types/size";
import {useEffect, useState} from "react";
import {sizeService} from "@/services/size-service";
import {toast} from "sonner";
import {SizeForm} from "@/components/dashboard/sections/sizes/create-update-form";

export default function Page({params}: { params: { sizeId: string } }) {
    const [size, setSize] = useState<Size | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await sizeService.fetchById(params.sizeId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setSize(response.data as Size); // Assuming response.data contains the size data
        };
        fetchData();
    }, [params.sizeId]);

    return (
        <div className="space-y-6">
            <SizeForm initialData={size}/>
        </div>
    );
}
