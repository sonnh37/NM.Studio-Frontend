"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import RichEditor from "@/components/client/react-draft-wysiwyg";
import { Const } from "@/lib/const";
import {Service} from "@/types/service";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Page({params}: { params: { serviceId: string } }) {
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        if (params.serviceId) {
            axios.get(`https://localhost:7192/services/${params.serviceId}`)
                .then(response => {
                    console.log("check",response.data.result);
                    setService(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch service data', err);
                });
        }
    }, [params.serviceId]);

    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Service', link: `${Const.DASHBOARD_SERVICE_URL}`},
        {title: `${params.serviceId}`, link: `/dashboard/services/${params.serviceId}`}
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            {service && (
                <RichEditor
                    service={service} // Pass the entire service object
                />
            )}
        </>
    );
}
