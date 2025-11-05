"use client";

import { LoginForm } from "@/components/_common/auth/login/login-form";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { RootState } from "@/lib/redux/store";
import { Role } from "@/types/entities/user";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
  const router = useRouter();
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(255, 255, 255)"
      gradientBackgroundEnd="rgb(255, 255, 255)"
      firstColor="241, 162, 181"
      secondColor="241, 162, 181"
      thirdColor="241, 162, 181"
      fourthColor="241, 162, 181"
      fifthColor="241, 162, 181"
      pointerColor="255, 255, 255"
    >
      <div className="absolute z-50 inset-0 flex items-center justify-center font-bold px-4">
        <LoginForm />
      </div>
    </BackgroundGradientAnimation>
  );
}
