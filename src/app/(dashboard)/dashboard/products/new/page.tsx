"use client"
import {ProductForm} from "@/components/dashboard/sections/products/create-update-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <ProductForm initialData={null}/>
        </div>
    )
}
