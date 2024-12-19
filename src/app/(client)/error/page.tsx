"use client";
import NotFound from "@/components/client/not-found";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function page() {
    const searchParams = useSearchParams(); // Lấy các tham số query từ URL

    useEffect(() => {
      // Kiểm tra nếu có query param 'toastWarning'
      const toastWarning = searchParams.get("toastWarning");
      if (toastWarning) {
        toast.warning(toastWarning); // Hiển thị thông báo toast
      }
    }, [searchParams]);
  return <NotFound />;
}
