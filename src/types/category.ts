import { BaseEntity } from "./base";
import { Outfit } from "./outfit";

export interface Category extends BaseEntity {
    name?: string;
    outfits: Outfit[];
}