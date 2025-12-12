import qs from "qs";

export const cleanQueryParams = (query: any) => {
  const cleaned: Record<string, any> = {};

  for (const key in query) {
    const value = query[key];
    if (Array.isArray(value)) {
      const isBooleanArray = value.every(
        (v) => v === true || v === false || v === "true" || v === "false"
      );

      if (isBooleanArray) {
        const normalized = value.map((v) =>
          typeof v === "boolean" ? v : v === "true"
        );

        const hasTrue = normalized.includes(true);
        const hasFalse = normalized.includes(false);

        if (hasTrue && hasFalse) {
          cleaned[key] = null;
        } else {
          // chỉ có 1 loại giá trị trong array
          const unique = Array.from(new Set(normalized));

          // nếu unique chỉ có 1 giá trị => collapse thành primitive
          if (unique.length === 1) {
            cleaned[key] = unique[0].toString();
          } else {
            cleaned[key] = normalized.map((b) => b.toString());
          }
        }
      } else {
        cleaned[key] = value;
      }
    } else {
      cleaned[key] = value;
    }
  }

  return qs.stringify(cleaned, {
    encode: true,
    allowDots: true,
    arrayFormat: "indices",
  });
};
