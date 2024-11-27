import {BaseEntity} from "./base";

export interface Service extends BaseEntity {
    name?: string;
    description?: string;
    src?: string;
    slug?: string;
    price?: number;
}