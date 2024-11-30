"use client"

import dynamic from 'next/dynamic';

const BlogForm = dynamic(() => import('@/components/dashboard/sections/blogs/create-update-form').then((mod) => mod.BlogForm), {
    ssr: false,  // Tắt SSR nếu cần thiết
});
export default function Page() {
    return (
        <div className="space-y-6">
            <BlogForm initialData={null} />
        </div>
    )
}
