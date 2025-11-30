export interface EnumOption {
    label: string;
    value: string;
}

export function getEnumOptions(enumObject: any): EnumOption[] {
    return Object.keys(enumObject)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            label: key,
            value: enumObject[key].toString(),
        }));
}

type EnumType = { [key: string]: string | number };

export function getEnumLabel<T extends EnumType>(
    enumObj: T,
    value?: T[keyof T] | null
): string {
    const enumValues = Object.entries(enumObj).filter(([key]) =>
        isNaN(Number(key))
    ); // Lấy các giá trị không phải số
    const found = enumValues.find(([_, enumValue]) => enumValue === value);
    return found ? found[0] : "Unknown";
}