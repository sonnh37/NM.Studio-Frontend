import {Gender, Role, UserStatus} from "../entities/user";
import {GetQueryableQuery} from "./base/base-query";

export interface UserGetAllQuery extends GetQueryableQuery {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    avatar?: string | null | undefined;
    email?: string | null | undefined;
    dob?: string | null | undefined;
    address?: string | null | undefined;
    gender?: Gender | null | undefined;
    phone?: string | null | undefined;
    username?: string | null | undefined;
    password?: string | null | undefined;
    role?: Role | null | undefined;
    status?: UserStatus | null | undefined;
    preferences?: string | null | undefined;
}
