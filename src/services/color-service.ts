import { Color } from "@/types/color";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";

class ColorService extends BaseService<Color> {
    constructor() {
        super(`${Const.COLOR}`);
    }
}

export const colorService = new ColorService();
