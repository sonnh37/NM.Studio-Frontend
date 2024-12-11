import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import sizeOf from "image-size";
import { ContentState, convertFromRaw, EditorState } from "draft-js";

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

export const convertJsonToPlainText = (description: string) => {
  try {
    const contentState = description
      ? convertFromRaw(JSON.parse(description))
      : ContentState.createFromText("");
    const editorState = EditorState.createWithContent(contentState);
    return editorState.getCurrentContent().getPlainText();
  } catch {
    return ""; // Trả về chuỗi rỗng nếu có lỗi
  }
};

export const createEditorState = (content: string): EditorState => {
  let contentState: ContentState;

  try {
    // Kiểm tra và chuyển đổi chuỗi JSON thành ContentState nếu có thể
    contentState = content ? convertFromRaw(JSON.parse(content)) : ContentState.createFromText('');
  } catch (error) {
    // Nếu không phải JSON hợp lệ, tạo ContentState từ văn bản thuần túy
    contentState = ContentState.createFromText(content || '');
  }

  return EditorState.createWithContent(contentState);
};

export function toLocalISOString(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000; // Chuyển phút lệch sang milliseconds
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

