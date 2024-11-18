import {BaseQueryableQuery} from "@/types/queries/base-query";

export const cleanQueryParams = (query: BaseQueryableQuery) => {
    const cleanedQuery: Record<string, any> = {};

    for (const key in query) {
        const value = query[key as keyof BaseQueryableQuery];

        // Xử lý trường hợp các giá trị boolean
        if (key === "isDeleted" || key === "isActive") {
            if (Array.isArray(value)) {
                cleanedQuery[key] = value
                    .filter((item) => item !== null)
                    .map((item) => item.toString());
            } else if (value !== undefined && value !== null) {
                cleanedQuery[key] = value.toString();
            }
        }
        // Xử lý giá trị array thông thường
        else if (Array.isArray(value)) {
            const filteredArray = value.filter((item) => item !== null);
            if (filteredArray.length > 0) {
                filteredArray.forEach((item, index) => {
                    cleanedQuery[`${key}[${index}]`] = item;
                });
            }
        }
        // Xử lý đối tượng: chuyển thành chuỗi JSON
        else if (typeof value === 'object' && value !== null) {
            // Convert object to JSON string
            cleanedQuery[key] = JSON.stringify(value); // Convert object to string
        }
        // Xử lý giá trị không phải array hay object
        else if (value !== undefined && value !== null) {
            cleanedQuery[key] = value;
        }
    }

    // Convert object cleanedQuery to query string
    const params = new URLSearchParams();

    for (const key in cleanedQuery) {
        const value = cleanedQuery[key];
        if (Array.isArray(value)) {
            value.forEach((val) => {
                params.append(key, val);
            });
        } else {
            params.append(key, value.toString());
        }
    }

    return params.toString(); // Return as query string
};
