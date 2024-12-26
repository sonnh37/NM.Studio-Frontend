"use client";

import { LoginForm } from "@/components/auth/login/login-form";
import LoadingPage from "@/components/common/loading-page";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import userSerice from "@/services/user-serice";
import { Role } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getCurrentUserLogin"],
    queryFn: async () => {
      const response = await userSerice.getCurrentUser();
      return response;
    },
    refetchOnWindowFocus: false,
  });
  
  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div>
        Cause: {error.cause as string} <br />
        Message: {error.message as string}
      </div>
    );
  }

  if (result && result.status == 1) {
    console.log("check_data", result);
    result.data?.role === Role.Customer ? router.push("/") : router.push("/dashboard");
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
