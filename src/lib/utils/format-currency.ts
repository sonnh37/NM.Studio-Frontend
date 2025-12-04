// Supported currencies: code, name, symbol, locale
export type CurrencyCode =
  | "VND"
  | "USD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "CNY"
  | "AUD"
  | "CAD";

export const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { name: string; locale: string; minimumFractionDigits?: number }
> = {
  VND: { name: "Vietnamese Dong", locale: "vi-VN", minimumFractionDigits: 0 },
  USD: { name: "US Dollar", locale: "en-US", minimumFractionDigits: 2 },
  EUR: { name: "Euro", locale: "de-DE", minimumFractionDigits: 2 },
  JPY: { name: "Japanese Yen", locale: "ja-JP", minimumFractionDigits: 0 },
  GBP: { name: "British Pound", locale: "en-GB", minimumFractionDigits: 2 },
  CNY: { name: "Chinese Yuan", locale: "zh-CN", minimumFractionDigits: 2 },
  AUD: { name: "Australian Dollar", locale: "en-AU", minimumFractionDigits: 2 },
  CAD: { name: "Canadian Dollar", locale: "en-CA", minimumFractionDigits: 2 },
};

/**
 * Format a number as currency with support for multiple currencies
 * @param value - The numeric value to format
 * @param currency - Currency code (VND, USD, EUR, JPY, GBP, CNY, AUD, CAD). Default: VND
 * @returns Formatted currency string or empty string if value is undefined
 *
 * @example
 * formatCurrency(1000) // "₫1.000" (VND)
 * formatCurrency(1000, "USD") // "$1,000.00"
 * formatCurrency(1000, "EUR") // "1.000,00 €"
 * formatCurrency(undefined, "VND") // ""
 */
export const formatCurrency = (
  value: number | undefined,
  currency: CurrencyCode = "VND"
): string => {
  if (value === undefined || value === null) return "";

  const config = CURRENCY_CONFIG[currency];
  if (!config) return "";

  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: config.minimumFractionDigits,
      maximumFractionDigits: config.minimumFractionDigits ?? 2,
    }).format(value);
  } catch (error) {
    console.error(`Error formatting currency ${currency}:`, error);
    return "";
  }
};

/**
 * Get symbol for a given currency code
 * @param currency - Currency code
 * @returns Currency symbol
 *
 * @example
 * getCurrencySymbol("USD") // "$"
 * getCurrencySymbol("EUR") // "€"
 */
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  try {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    // Extract symbol from formatted string (e.g., "$1.00" -> "$")
    const parts = formatter.formatToParts(1);
    const symbolPart = parts.find((part) => part.type === "currency");
    return symbolPart?.value ?? currency;
  } catch {
    return currency;
  }
};

/**
 * Get currency name
 * @param currency - Currency code
 * @returns Currency name
 *
 * @example
 * getCurrencyName("VND") // "Vietnamese Dong"
 */
export const getCurrencyName = (currency: CurrencyCode): string => {
  return CURRENCY_CONFIG[currency]?.name ?? currency;
};
