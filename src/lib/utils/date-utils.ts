import { format } from "date-fns";
import { Constants } from "../constants/constants";

export function formatDateDataTable(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    return "";
  }
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

/**
 * Format a date using a provided date-fns pattern.
 * If formatStr is omitted, defaults to "dd/MM/yyyy".
 */
export const formatDate = (
  date?: Date | string | null,
  formatStr: string = Constants.DATE_FORMAT
) => {
  if (!date) return "Không có ngày";

  const validDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(validDate.getTime())) return "Ngày không hợp lệ";

  return format(validDate, formatStr);
};

/**
 * Convenience helper to format a date including time.
 */
export const formatDateWithTime = (date?: Date | string | null) =>
  formatDate(date, Constants.DATETIME_FORMAT);
