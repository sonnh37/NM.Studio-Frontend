import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import sizeOf from 'image-size';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isMacOs() {
    if (typeof window === "undefined") return false;

    return window.navigator.userAgent.includes("Mac");
}

export const convertToISODate = (
    date: Date | string | null | undefined
): string | null => {
    if (!date) return null;

    // If it's a string, convert it to a Date object
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Ensure dateObj is a valid Date object
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        console.error("Invalid date:", date);
        return null;
    }

    return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
};

export const isValidImage = async (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true); // Image loaded successfully
        img.onerror = () => resolve(false); // Error in loading image
        img.src = src;
    });
};

// export const isValidImage = (src: string): boolean => {
//     const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     return validExtensions.some(extension => src.endsWith(extension));
// };

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
