"use client";

import { LoginForm } from "@/components/auth/login/login-form";
import { LoadingPageComponent } from "@/components/common/loading-page";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { RootState } from "@/lib/store";
import userSerice from "@/services/user-serice";
import { Role } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  if (user) {
    if (user.role === Role.Customer) {
      window.location.href = "/";
      return;
    }
    // other roles
    window.location.href = "/dashboard";
    return;
  }

  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center font-bold px-4">
        <LoginForm />
      </div>
    </BackgroundGradientAnimation>
  );
}
