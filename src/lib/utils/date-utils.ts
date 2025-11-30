import {format} from "date-fns";

export function dateUtils(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {},
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

export const formatDate = (
    date?: Date | string | null,
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