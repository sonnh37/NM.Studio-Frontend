import {BaseEntity} from "./base";

export interface Service extends BaseEntity {
    name?: string | null | undefined;
    description?: string | null | undefined;
    src?: string | null | undefined;
    slug?: string | null | undefined;
    price?: number | null | undefined;
}