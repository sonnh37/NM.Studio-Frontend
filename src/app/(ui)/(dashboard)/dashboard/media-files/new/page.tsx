"use client"

import {BlogForm} from '@/components/sites/dashboard/sites/blogs/create-update-form';
import { MediaBaseForm } from '@/components/sites/dashboard/sites/media-files/create-update-form';

export default function Page() {
    return (
        <div className="space-y-6">
            <MediaBaseForm initialData={null}/>
        </div>
    )
}
