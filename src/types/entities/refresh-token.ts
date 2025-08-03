import {BaseEntity} from "@/types/entities/base/base";
import { User } from "./user";

export interface RefreshToken extends BaseEntity{
    userId?: string;
    token?: string;
    keyId?: string;
    publicKey?: string;
    userAgent?: string;
    ipAddress?: string;
    expiry?: string;
    user?: User;
}