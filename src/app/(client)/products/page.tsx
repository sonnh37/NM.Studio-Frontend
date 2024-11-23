"use client";

import dynamic from "next/dynamic";

const SidebarProductCards = dynamic(() => import('@/components/client/sections/products'), {
    ssr: false,  // Tắt SSR cho component này, chỉ render phía client
});
const ProductPage = () => {
    return <SidebarProductCards/>;
};

export default ProductPage;
