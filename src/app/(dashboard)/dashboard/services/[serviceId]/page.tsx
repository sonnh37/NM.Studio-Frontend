"use client";
import {Service} from "@/types/service";
import {useEffect, useState} from "react";
import {ServiceForm} from "@/components/dashboard/sections/services/create-update-form";
import {toast} from "sonner";
import {serviceService} from "@/services/service-service";
import {Const} from "@/lib/const";

export default function Page({params}: { params: { serviceId: string } }) {
    const [service, setService] = useState<Service | null>(null);

    // Fetch service data when params.serviceId changes
    useEffect(() => {
        const fetchData = async () => {
            const response = await serviceService.fetchById(params.serviceId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setService(response.data!); // Assuming response.data contains the course data
        };
        fetchData();
    }, [params.serviceId]);

    return (
        <div className="space-y-6">
            <ServiceForm initialData={service}/>
        </div>
    );
}
