"use client";
import {AlbumForm} from "@/components/dashboard/sites/albums/create-update-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <AlbumForm initialData={null}/>
        </div>
    );
}
