import {BaseEntity} from "./base";
import { Category } from "./category";
import { Color } from "./color";
import { OutfitXPhoto } from "./outfit-x-photo";
import {Photo} from "./photo";
import { Size } from "./size";

export interface Outfit extends BaseEntity {
    sku?: string;
    categoryId?: string; // Guid trong TypeScript thường được biểu diễn bằng string
    sizeId?: string;
    colorId?: string;
    name?: string;
    price?: number;
    description?: string;
    color?: Color; // Định nghĩa Color nếu cần
    category?: Category; // Định nghĩa Category nếu cần
    size?: Size; // Định nghĩa Size nếu cần
    status: OutfitStatus; // Định nghĩa OutfitStatus nếu cần
    outfitXPhotos: OutfitXPhoto[];
}


enum OutfitStatus {
    Unspecified = 0,
    Available = 1,
    Rented = 2,
    InMaintenance = 3,
    Discontinued = 4
}