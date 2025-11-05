import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ContentState, convertFromRaw, EditorState } from "draft-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}

export function getDefaultFormFilterValues(
  formFilterAdvanceds: FormFilterAdvanced[]
) {
  const defaults: Record<string, any> = {};
  formFilterAdvanceds.forEach((item) => {
    defaults[item.name] = item.defaultValue;
  });
  return defaults;
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

export const toSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/đ/g, "d") // Thay thế "đ" bằng "d"
    .replace(/[^a-z0-9 ]/g, "") // Loại bỏ các ký tự không phải chữ cái, số, hoặc khoảng trắng
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+$/, "") // Loại bỏ các dấu gạch ngang dư thừa ở cuối
    .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
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

type EnumType = { [key: string]: string | number };

export function getEnumLabel<T extends EnumType>(
  enumObj: T,
  value?: T[keyof T]
): string {
  const enumValues = Object.entries(enumObj).filter(([key]) =>
    isNaN(Number(key))
  ); // Lấy các giá trị không phải số
  const found = enumValues.find(([_, enumValue]) => enumValue === value);
  return found ? found[0] : "Unknown";
}

export const formatDate = (
  date: Date | string | undefined | null,
  isShowTime: boolean = false
) => {
  if (!date) return "Không có ngày";
  // 0:00
  const validDate = typeof date === "string" ? new Date(date) : date;
  // 7:00
  if (isNaN(validDate.getTime())) return "Ngày không hợp lệ";

  const formatString = isShowTime ? "dd/MM/yyyy HH:mm:ss" : "dd/MM/yyyy";
  return format(validDate, formatString);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0, // Loại bỏ phần thập phân
  }).format(price);
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

export const cleanQueryParams = (query: any) => {
  const cleanedQuery: Record<string, any> = {};

  for (const key in query) {
    const value = query[key];

    // Flatten pagination
    if (key === "pagination" && typeof value === "object" && value !== null) {
      for (const subKey in value) {
        const subValue = value[subKey];
        if (subValue !== undefined && subValue !== null) {
          cleanedQuery[`pagination.${capitalize(subKey)}`] =
            subValue.toString();
        }
      }
      continue;
    }

    // Flatten sorting
    if (key === "sorting" && typeof value === "object" && value !== null) {
      const { sortField, sortDirection } = value;
      if (sortField) cleanedQuery["sorting.sortField"] = sortField;
      if (sortDirection !== undefined && sortDirection !== null)
        cleanedQuery["sorting.sortDirection"] = sortDirection.toString();
      continue;
    }

    if (key.startsWith("is")) {
      if (Array.isArray(value)) {
        if (value.includes(true) && value.includes(false)) {
          // cleanedQuery[key] = null;
        } else {
          cleanedQuery[key] = value
            .filter((item) => item !== null)
            .map((item) => item.toString());
        }
      } else if (value !== undefined && value !== null) {
        cleanedQuery[key] = value.toString();
      }
    }

    // Array
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item !== null && item !== undefined) {
          cleanedQuery[`${key}[${index}]`] = item.toString();
        }
      });
      continue;
    }

    // Object khác
    if (typeof value === "object" && value !== null) {
      cleanedQuery[key] = JSON.stringify(value);
      continue;
    }

    // Primitive
    if (value !== undefined && value !== null) {
      cleanedQuery[key] = value.toString();
    }
  }

  const params = new URLSearchParams();
  for (const key in cleanedQuery) {
    params.append(key, cleanedQuery[key]);
  }

  return params.toString();
};

const capitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

export const getWordCount = (content: string) => {
  return content.trim().split(/\s+/).length;
};
