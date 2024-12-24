"use client";

import React from "react";
import {BackgroundGradientAnimation} from "@/components/ui/background-gradient-animation";
import {LoginForm} from "@/components/auth/login/login-form";

export default function Page() {
    return (
        <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center font-bold px-4">
                <LoginForm/>
            </div>
        </BackgroundGradientAnimation>
    );
}
