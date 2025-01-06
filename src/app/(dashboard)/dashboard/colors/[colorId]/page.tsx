"use client";
import {Color} from "@/types/color";
import {useEffect, useState} from "react";
import {colorService} from "@/services/color-service";
import {toast} from "sonner";
import {ColorForm} from "@/components/dashboard/sites/colors/create-update-form";

export default function Page({params}: { params: { colorId: string } }) {
    const [color, setColor] = useState<Color | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await colorService.fetchById(params.colorId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setColor(response.data as Color); // Assuming response.data contains the color data
        };
        fetchData();
    }, [params.colorId]);

    return (
        <div className="space-y-6">
            <ColorForm initialData={color}/>
        </div>
    );
}
