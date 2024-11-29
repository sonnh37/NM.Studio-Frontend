"use client"
import {SizeForm} from "@/components/dashboard/sections/sizes/create-update-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <SizeForm initialData={null}/>
        </div>
    )
}
