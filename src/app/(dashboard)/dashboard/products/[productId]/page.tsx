"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {Product} from "@/types/product";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";
import { productService } from "@/services/product-service";
import { toast } from "sonner";
import { ProductForm } from "@/components/dashboard/sections/courses/create-update-form";

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

    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Product', link: '/dashboard/product'},
        {title: `${params.productId}`, link: `/dashboard/product/${params.productId}`}
    ];

    return (
        <ContentLayout title="Product">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <ProductForm initialData={product}/>
            </div>
        </ContentLayout>
    );
}
