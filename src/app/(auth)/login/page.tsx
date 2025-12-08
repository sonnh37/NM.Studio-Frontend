"use client";

import { LoginForm } from "@/components/_common/auth/login/login-form";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Simple background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Light gradient accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gray-100 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-100 to-transparent rounded-full translate-x-1/3 translate-y-1/3 opacity-20" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
}
