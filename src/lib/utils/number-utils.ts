export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0, // Loại bỏ phần thập phân
    }).format(price);
};

export const formatRangePrice = (minPrice: number, maxPrice: number) => {
    if (minPrice === 0 && maxPrice === 0) return "Đang cập nhật";
    if (minPrice === maxPrice) return formatPrice(minPrice);
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

