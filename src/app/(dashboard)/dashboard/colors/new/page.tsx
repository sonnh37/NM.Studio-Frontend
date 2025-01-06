"use client"
import {ColorForm} from "@/components/dashboard/sites/colors/create-update-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <ColorForm initialData={null}/>
        </div>
    )
}
