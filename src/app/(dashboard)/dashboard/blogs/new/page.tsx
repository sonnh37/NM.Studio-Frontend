"use client"

import { BlogForm } from '@/components/dashboard/sections/blogs/create-update-form';
import dynamic from 'next/dynamic';

export default function Page() {
    return (
        <div className="space-y-6">
            <BlogForm initialData={null} />
        </div>
    )
}