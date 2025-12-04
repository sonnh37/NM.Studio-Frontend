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
            const {sortField, sortDirection} = value;
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