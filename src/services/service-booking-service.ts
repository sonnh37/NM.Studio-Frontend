import {ServiceBooking} from "@/types/entities/service-booking";
import {BaseService} from "./base/base-service";
import {Constants} from "@/lib/constants/constants";
import {BusinessResult} from "@/types/models/business-result";
import axiosInstance from "@/lib/interceptors/axios-instance";

class ServiceBookingService extends BaseService<ServiceBooking> {
    constructor() {
        super(`${Constants.SERVICE_BOOKINGS}`);
    }

    async cancel(id: string): Promise<BusinessResult<null>> {
        const res = await axiosInstance.put<BusinessResult<null>>(`${this.endpoint}/cancel`, {id: id})
        return res.data;
    };
}

export const serviceBookingService = new ServiceBookingService();
