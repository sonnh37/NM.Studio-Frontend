import {CreateCommand, UpdateCommand} from "./base-command";

export interface ServiceCreateCommand extends CreateCommand {
    name?: string;
    description?: string;
    src?: string;
    price?: number;
    duration?: string; // TimeSpan không có kiểu tương đương trực tiếp, có thể dùng string để lưu trữ ISO 8601 duration
    promotion?: string;
    isActive: boolean;
}

export interface ServiceUpdateCommand extends UpdateCommand {
    name?: string;
    description?: string;
    src?: string;
    price?: number;
    duration?: string; // TimeSpan không có kiểu tương đương trực tiếp, có thể dùng string để lưu trữ ISO 8601 duration
    promotion?: string;
    isActive: boolean;
}
