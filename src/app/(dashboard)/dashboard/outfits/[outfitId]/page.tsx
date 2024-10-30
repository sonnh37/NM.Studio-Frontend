"use client";
import {Breadcrumbs} from "@/components/client/breadcrumb";
import {ProductForm} from "@/components/dashboard/tables/products/create-update-form";
import {Product} from "@/types/product";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";

export default function Page({params}: { params: { productId: string } }) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (params.productId) {
            axios.get(`https://localhost:7192/products/${params.productId}`)
                .then(response => {
                    setProduct(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch product data', err);
                });
        }
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
