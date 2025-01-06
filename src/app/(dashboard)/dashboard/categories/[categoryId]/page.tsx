"use client";
import {Category} from "@/types/category";
import {useEffect, useState} from "react";
import {categoryService} from "@/services/category-service";
import {toast} from "sonner";
import {CategoryForm} from "@/components/dashboard/sites/categories/create-update-form";

export default function Page({params}: { params: { categoryId: string } }) {
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await categoryService.fetchById(params.categoryId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setCategory(response.data as Category); // Assuming response.data contains the category data
        };
        fetchData();
    }, [params.categoryId]);

    return (
        <div className="space-y-6">
            <CategoryForm initialData={category}/>
        </div>
    );
}
