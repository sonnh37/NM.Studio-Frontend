"use client";

import { Button } from "@/components/ui/button";
import EditForm from "../_components/EditForm";

import "./style.scss";
import { useRouter } from "next/navigation";
import PostPage from "../../post-csr/page";

export default function EditPage() {
  const router = useRouter();
  return (
    <div className="max-w-4xl w-full mx-auto py-10 px-6">
      <Button onClick={() => router.push("/")}>Back</Button>
      <EditForm />

      <PostPage />
    </div>
  );
}
