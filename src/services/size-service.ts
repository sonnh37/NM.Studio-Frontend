import {Size} from "@/types/size";
import {BaseService} from "./base-service";
import {Const} from "@/lib/constants/const";

class SizeService extends BaseService<Size> {
    constructor() {
        super(`${Const.SIZE}`);
    }
}

export const sizeService = new SizeService();
