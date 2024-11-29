"use client";
import {Blog} from "@/types/blog";
import {useEffect, useState} from "react";
import {blogService} from "@/services/blog-service";
import {toast} from "sonner";
import {BlogForm} from "@/components/dashboard/sections/blogs/create-update-form";

export default function Page({params}: { params: { blogId: string } }) {
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogService.fetchById(params.blogId);
            if (response.status !== 1) {
                return toast.error(response.message);
            }
            setBlog(response.data as Blog); // Assuming response.data contains the blog data
        };
        fetchData();
    }, [params.blogId]);

    return (
        <div className="space-y-6">
            <BlogForm initialData={blog}/>
        </div>
    );
}
