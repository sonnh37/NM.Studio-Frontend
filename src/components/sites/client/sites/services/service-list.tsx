import ErrorSystem from "@/components/_common/errors/error-system";
import {LoadingPageComponent} from "@/components/_common/loading-page";

import {serviceService} from "@/services/service-service";
import {ServiceGetAllQuery} from "@/types/cqrs/queries/service-query";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {ServiceCard} from "./service-card";

export function ServiceList() {
    const router = useRouter();
    const query: ServiceGetAllQuery = {
        isDeleted: false,
        pagination: {
            isPagingEnabled: true,
            pageSize: 6,
            pageNumber: 1,
        },
        includeProperties: ["backgroundCover"],
    };
    const {
        data: services = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["fetchServices", query],
        queryFn: async () => {
            const response = await serviceService.getAll(query);
            return response.data?.results;
        },
    });

    if (isLoading) return <LoadingPageComponent/>;

    if (isError) {
        console.log("Error fetching:", error);
        return <ErrorSystem/>;
    }

    return (
        <div className="my-3 container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service}/>
            ))}
        </div>
    );
}
