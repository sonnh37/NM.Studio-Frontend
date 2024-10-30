import { BaseEntity } from "./base";
import { Outfit } from "./outfit";

export interface Color extends BaseEntity {
    name?: string;
    outfits: Outfit[];
}