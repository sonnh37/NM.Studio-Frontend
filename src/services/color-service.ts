import {Color} from "@/types/entities/color";
import {BaseService} from "./base/base-service";
import {Const} from "@/lib/constants/const";

class ColorService extends BaseService<Color> {
    constructor() {
        super(`${Const.COLORS}`);
    }
}

export const colorService = new ColorService();
