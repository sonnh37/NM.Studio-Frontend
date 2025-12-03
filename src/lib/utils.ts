"use client";
import { MediaBase } from "@/types/entities/media-base";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { BusinessResult, Status } from "@/types/models/business-result";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTypeFile } from "./utils/image-utils";
import { FileMetadata } from "@/hooks/use-file-upload";
import { Constants } from "./constants/constants";

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

export const processResponse = <T>(res: BusinessResult<T>) => {
  if (res.status !== Status.OK) {
    throw new Error(res.error?.detail || "API error");
  }
  return res.data as T;
};

type StockLevel = "Low" | "Medium" | "High";
export function calculateStock(
  totalStockDefaultQuantity: number,
  totalStockQuantity: number
): {
  stock: number;
  stockLevel: StockLevel;
  percent: number;
} {
  const stock = totalStockQuantity;
  const percent =
    totalStockDefaultQuantity > 0
      ? (totalStockQuantity / totalStockDefaultQuantity) * 100
      : 0;

  let stockLevel: StockLevel;

  if (percent >= 60) stockLevel = "High";
  else if (percent >= 30) stockLevel = "Medium";
  else stockLevel = "Low";

  return {
    stock,
    stockLevel,
    percent,
  };
}

// Hàm tạo File ảo từ MediaBase
export const createVirtualFileMetaFromMedia = (
  media: MediaBase
): FileMetadata => {
  const emptyBlob = new Blob([], {
    type: getTypeFile(media) || "application/octet-stream",
  });

  // Tạo File object
  const file = new File(
    [emptyBlob],
    media.displayName || media.title || "unknown",
    {
      type: getTypeFile(media) || "application/octet-stream",
      lastModified: new Date(media.createdDate || Date.now()).getTime(),
    }
  );

  // Type assertion và thêm properties
  const virtualFileMeta = file as any as FileMetadata;

  // Thêm các thuộc tính custom
  virtualFileMeta.id = media.id;
  virtualFileMeta.url = media.mediaUrl || "";
  virtualFileMeta.status = "uploaded";

  // Override size

  Object.defineProperties(virtualFileMeta, {
    // Thêm id từ MediaBase
    id: {
      value: media.id,
      writable: false,
      enumerable: true,
    },
    // Thêm URL để render ảnh
    url: {
      value: media.mediaUrl || "",
      writable: false,
      enumerable: true,
    },
    // Thêm kích thước thật
    originalSize: {
      value: media.size,
      writable: false,
      enumerable: true,
    },
    // Đánh dấu là file ảo
    isVirtual: {
      value: true,
      writable: false,
      enumerable: true,
    },
    // Thêm width/height nếu là ảnh
    ...(media.width && { width: { value: media.width, enumerable: true } }),
    ...(media.height && { height: { value: media.height, enumerable: true } }),
  });
  return virtualFileMeta;
};

export const createVirtualFileFromMedia = (media: MediaBase): File => {
  // Tạo một blob rỗng (hoặc có thể fetch dữ liệu thật nếu cần)
  const emptyBlob = new Blob([], {
    type: getTypeFile(media) || "application/octet-stream",
  });

  // Tạo File object từ Blob
  const virtualFile = new File(
    [emptyBlob],
    media.displayName || media.title || "unknown",
    {
      type: getTypeFile(media) || "application/octet-stream",
      lastModified: new Date(media.createdDate || Date.now()).getTime(),
    }
  );

  // Thêm các thuộc tính tùy chỉnh
  Object.defineProperties(virtualFile, {
    // Thêm id từ MediaBase
    id: {
      value: media.id,
      writable: false,
      enumerable: true,
    },
    // Thêm URL để render ảnh
    url: {
      value: media.mediaUrl || "",
      writable: false,
      enumerable: true,
    },
    // Thêm kích thước thật
    originalSize: {
      value: media.size,
      writable: false,
      enumerable: true,
    },
    // Đánh dấu là file ảo
    isVirtual: {
      value: true,
      writable: false,
      enumerable: true,
    },
    // Thêm width/height nếu là ảnh
    ...(media.width && { width: { value: media.width, enumerable: true } }),
    ...(media.height && { height: { value: media.height, enumerable: true } }),
  });

  return virtualFile;
};

// Tạo danh sách files từ MediaBase array
export const createFilesFromMediaList = (mediaList: MediaBase[]): File[] => {
  return mediaList.map(createVirtualFileFromMedia);
};

// Hàm hỗ trợ lấy URL từ File (cho cả file thật và ảo)
export const getFileUrl = (file: File): string => {
  // Nếu là file ảo có thuộc tính url
  if ("url" in file && typeof (file as any).url === "string") {
    return (file as any).url;
  }

  // Nếu là file thật, tạo Object URL
  return URL.createObjectURL(file);
};

// Hàm hỗ trợ lấy ID từ File
export const getFileId = (file: File): string => {
  return "id" in file ? (file as any).id : "";
};
