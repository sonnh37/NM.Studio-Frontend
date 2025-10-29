"use client";

import { Button } from "@/components/ui/button";
import EditForm from "../_components/EditForm";

import "./style.scss"
import { useRouter } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  return (
    <div className="max-w-[56rem] w-full mx-auto py-10 px-6">
      <Button onClick={() => router.push("/")}>Back</Button>
      <EditForm />
    </div>
  );
}
