import userSerice from "@/services/user-serice";
import {type ClassValue, clsx} from "clsx";
import {ContentState, convertFromRaw, EditorState} from "draft-js";
import {NextApiRequest} from "next";
import {twMerge} from "tailwind-merge";

var jwt = require('jsonwebtoken');

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
    const dateObj = typeof date === "string" ? new Date(date) : date;

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

type EnumType = { [key: string]: string | number };

export function getEnumLabel<T extends EnumType>(enumObj: T, value?: T[keyof T]): string {
    const enumValues = Object.entries(enumObj).filter(([key]) => isNaN(Number(key))); // Lấy các giá trị không phải số
    const found = enumValues.find(([_, enumValue]) => enumValue === value);
    return found ? found[0] : "Unknown";
}

export const formatDate = (date: Date | string | undefined | null) => {
    if (!date) return "Không có ngày"; // Xử lý khi giá trị không tồn tại
    const validDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(validDate.getTime())) return "Ngày không hợp lệ"; // Xử lý ngày không hợp lệ
    return new Intl.DateTimeFormat("vi-VN", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).format(validDate);
};

// export const convertJsonToPlainText = (description: string) => {
//   try {
//     const contentState = description
//       ? convertFromRaw(JSON.parse(description))
//       : ContentState.createFromText("");
//     const editorState = EditorState.createWithContent(contentState);
//     return editorState.getCurrentContent().getPlainText();
//   } catch {
//     return ""; // Trả về chuỗi rỗng nếu có lỗi
//   }
// };

// export const getAccessToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("accessToken="))
//       ?.split("=")[1] || null;
//   }
//   return null;
// };

// export const getRefreshToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("refreshToken="))
//       ?.split("=")[1] || null;
//   }
//   return null;
// };

export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    if (!refreshToken) {
        return null;
    }

    // Gửi yêu cầu đến API để refresh token
    const response = await userSerice.refreshToken(refreshToken);

    if (response.status == 1) {
        const data = response.data;
        return data?.token ?? null;
    }

    return null;
};

export const getRefreshToken = (req: NextApiRequest): string | null => {
    const cookies = req.cookies;
    return cookies.refreshToken || null;
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as { exp: number };
        return Date.now() > decoded.exp * 1000;
    } catch (error) {
        return true;
    }
};


export const convertHtmlToPlainText = (description: string): string => {
    try {
        // Sử dụng DOMParser để chuyển đổi HTML sang text
        const parser = new DOMParser();
        const doc = parser.parseFromString(description, "text/html");
        return doc.body.textContent || ""; // Lấy text thuần từ nội dung HTML
    } catch (error) {
        console.error("Error converting HTML to plain text:", error);
        return ""; // Trả về chuỗi rỗng nếu xảy ra lỗi
    }
};

export const convertUrlToFile = async (url: string): Promise<File | null> => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        // Lấy tên file từ URL hoặc tạo tên ngẫu nhiên nếu không có
        const urlParts = url.split('/');
        const filename = urlParts[urlParts.length - 1] || `notfound_${Date.now()}.jpg`;

        const file = new File([blob], filename, {type: blob.type});
        return file;
    } catch (error) {
        console.error("Error converting URL to File:", error);
        return null;
    }
};

export const createEditorState = (content: string): EditorState => {
    let contentState: ContentState;

    try {
        // Kiểm tra và chuyển đổi chuỗi JSON thành ContentState nếu có thể
        contentState = content
            ? convertFromRaw(JSON.parse(content))
            : ContentState.createFromText("");
    } catch (error) {
        // Nếu không phải JSON hợp lệ, tạo ContentState từ văn bản thuần túy
        contentState = ContentState.createFromText(content || "");
    }

    return EditorState.createWithContent(contentState);
};

export function toLocalISOString(date: Date) {
    const tzOffset = date.getTimezoneOffset() * 60000; // Chuyển phút lệch sang milliseconds
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}
