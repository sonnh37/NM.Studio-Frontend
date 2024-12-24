"use client";

import {RegisterForm} from "@/components/auth/register/register-form";
import {BackgroundGradientAnimation} from "@/components/ui/background-gradient-animation";


export default function Page() {
    return (
        <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center font-bold px-4">
                <RegisterForm/>
            </div>
        </BackgroundGradientAnimation>
    );
}
