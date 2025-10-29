"use client"

import {BlogForm} from '@/components/sites/dashboard/sites/blogs/create-update-form';

export default function Page() {
    return (
        <div className="space-y-6">
            <BlogForm initialData={null}/>
        </div>
    )
}
