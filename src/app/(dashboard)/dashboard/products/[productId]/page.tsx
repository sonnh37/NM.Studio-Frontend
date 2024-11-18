"use client";
import {Product} from "@/types/product";
import {useEffect, useState} from "react";
import {productService} from "@/services/product-service";
import {toast} from "sonner";
import {ProductForm} from "@/components/dashboard/sections/products/create-update-form";

export default function Page({params}: { params: { productId: string } }) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.fetchById(params.productId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setProduct(response.data as Product); // Assuming response.data contains the product data
        };
        fetchData();
    }, [params.productId]);

    return (
        <div className="space-y-6">
            <ProductForm initialData={product}/>
        </div>
    );
}
