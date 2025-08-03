import {BaseEntity} from "./base/base";
import {ProductColor} from "./product-color";

export interface Color extends BaseEntity{
    name?: string;
    colorCode?: string;
    colorType?: string;
    description?: string;
    imagePath?: string;
    isActive: boolean;
    sortOrder: number;
    productColors: ProductColor[];
}