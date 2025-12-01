"use client";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { BusinessResult, Status } from "@/types/models/business-result";
import { type ClassValue, clsx } from "clsx";
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
