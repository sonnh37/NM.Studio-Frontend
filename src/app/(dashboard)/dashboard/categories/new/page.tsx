"use client"
import {CategoryForm} from "@/components/dashboard/sites/categories/create-update-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <CategoryForm initialData={null}/>
        </div>
    )
}
