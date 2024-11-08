"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {Service} from "@/types/service";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {ServiceForm} from "@/components/dashboard/sections/services/create-update-form";
import { toast } from "sonner";
import { serviceService } from "@/services/service-service";
import { Const } from "@/lib/const";

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

    // Set breadcrumb items based on params.serviceId and service data
    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Service', link: `${Const.DASHBOARD_SERVICE_URL}`},
        {title: `${params.serviceId}`, link: `${Const.DASHBOARD_SERVICE_URL}/${params.serviceId}`}
    ];

    return (
        <ContentLayout title="Service">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <ServiceForm initialData={service}/>
            </div>
        </ContentLayout>
    );
}
