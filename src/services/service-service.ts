import { Service } from "@/types/service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { BaseService } from "./base-service";  
import { Const } from "@/lib/const";
class ServiceService extends BaseService<Service> {
    constructor() {
        super(`${Const.SERVICE}`);
    }

    
}

export const serviceService = new ServiceService();
