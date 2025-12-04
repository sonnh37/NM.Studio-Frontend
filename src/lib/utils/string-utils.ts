export function toLocalISOString(date: Date) {
    const tzOffset = date.getTimezoneOffset() * 60000; // Chuyển phút lệch sang milliseconds
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

export function getValidateString(value: unknown): string | null {
    if (typeof value === "string") return value.trim() || null;
    return null;
}

export function getValidateStringArray(value: unknown): string[] | null {
    if (Array.isArray(value)) {
        const arr = value.filter((v) => typeof v === "string" && v.trim().length);
        return arr.length ? arr : null;
    }
    return null;
}