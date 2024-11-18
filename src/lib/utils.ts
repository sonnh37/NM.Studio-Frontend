import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isMacOs() {
    if (typeof window === "undefined") return false;

    return window.navigator.userAgent.includes("Mac");
}

export const convertToISODate = (
    date: Date | null | undefined
): string | null => {
    if (!date) return null;
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
};

export const formatTimeSpan = (time: string): string => {
    // Chia tách giờ và phút
    const [hours, minutes] = time.split(":");

    // Trả về định dạng "HH:mm:ss.ssssss"
    return `${hours}:${minutes}:00.0000000`;
};

export const formatCurrency = (value: number | undefined): string => {
    if (value === undefined) return "";
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

export function getEnumOptions(enumObject: any) {
    return Object.keys(enumObject)
        .filter((key) => isNaN(Number(key))) // Lọc để chỉ lấy tên (không lấy số index)
        .map((key) => ({
            label: key,
            value: enumObject[key].toString(),
        }));
}
