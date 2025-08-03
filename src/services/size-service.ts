import {Size} from "@/types/entities/size";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class SizeService extends BaseService<Size> {
    constructor() {
        super(`${Const.SIZES}`);
    }
}

export const sizeService = new SizeService();
