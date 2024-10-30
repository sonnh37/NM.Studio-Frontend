import { BaseEntity } from "./base";
import { Outfit } from "./outfit";
import { Photo } from "./photo";

export interface OutfitXPhoto extends BaseEntity {
    outfitId?: string;
    photoId?: string;
    outfit?: Outfit;
    photo?: Photo;
}
