"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {Service} from "@/types/service";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";
import {ServiceForm} from "@/components/dashboard/tables/services/create-update-form";

export default function Page({params}: { params: { serviceId: string } }) {
    const [service, setService] = useState<Service | null>(null);

    // Fetch service data when params.serviceId changes
    useEffect(() => {
        if (params.serviceId) {
            axios.get(`https://localhost:7192/services/${params.serviceId}`)
                .then(response => {
                    setService(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch service data', err);
                });
        }
    }, [params.serviceId]);

    // Set breadcrumb items based on params.serviceId and service data
    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Service', link: '/dashboard/service'},
        {title: `${params.serviceId}`, link: `/dashboard/service/${params.serviceId}`}
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
