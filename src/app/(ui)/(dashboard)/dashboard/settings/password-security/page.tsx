"use client";
import {Separator} from "@/components/ui/separator"
import ResetPasswordForm from "./reset-password-form"
import {useSelector} from "react-redux";
import {RootState} from "@/lib/redux/store";

export default function SettingsAccountPage() {
    const user = useSelector((state: RootState) => state.user.user);
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings. Set your preferred language and
                    timezone.
                </p>
            </div>
            <Separator/>
            <ResetPasswordForm user={user ?? undefined}/>
        </div>
    )
}
