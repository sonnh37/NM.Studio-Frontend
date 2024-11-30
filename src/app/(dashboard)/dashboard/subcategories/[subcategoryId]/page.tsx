"use client";
import {SubCategory} from "@/types/category";
import {useEffect, useState} from "react";
import {subCategoryService} from "@/services/sub-category-service";
import {toast} from "sonner";
import {SubCategoryForm} from "@/components/dashboard/sections/sub-categories/create-update-form";

export default function Page({params}: { params: { subcategoryId: string } }) {
    const [subcategory, setSubcategory] = useState<SubCategory | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await subCategoryService.fetchById(params.subcategoryId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setSubcategory(response.data as SubCategory); // Assuming response.data contains the subcategory data
        };
        fetchData();
    }, [params.subcategoryId]);

    return (
        <div className="space-y-6">
            <SubCategoryForm initialData={subcategory}/>
        </div>
    );
}
