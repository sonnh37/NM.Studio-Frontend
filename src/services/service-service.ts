import { Service } from "@/types/service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { BaseService } from "./base-service";  
class ServiceService extends BaseService<Service> {
    constructor() {
        super(`${process.env.NEXT_PUBLIC_API_BASE}/services`);
    }

    
}

export const serviceService = new ServiceService();
