"use client"

import {LoadingPageComponent} from "@/components/_common/loading-page";

import SuccessBooking from "@/components/_common/success-booking";
import {serviceBookingService} from "@/services/service-booking-service";
import {useQuery} from "@tanstack/react-query";
import {useParams, useRouter} from "next/navigation";

const CancelBooking: React.FC = () => {
    const router = useRouter();
    const {bookingId} = useParams();
    const {data, error, isLoading, isError, isSuccess} = useQuery({
        queryKey: ["cancelBooking", bookingId],
        queryFn: async () => await serviceBookingService.cancel(bookingId as string),
        enabled: !!bookingId,
        refetchOnWindowFocus: false
    });

    if (isLoading) return <LoadingPageComponent/>;
    if (isError)
        return (
            <p>
                Có lỗi xảy ra:{" "}
                {error instanceof Error ? error.message : "Không xác định"}
            </p>
        );
    if (isSuccess) return <SuccessBooking/>

    return null;
};

export default CancelBooking;
