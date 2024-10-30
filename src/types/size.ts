import { BaseEntity } from "./base";
import { Outfit } from "./outfit";

export interface Size extends BaseEntity {
    name?: string;
    outfits: Outfit[];
}