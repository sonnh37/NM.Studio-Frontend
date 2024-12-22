"use client";
import { ProfileForm } from "@/app/(dashboard)/dashboard/settings/profile-form";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user-serice"; // Ensure this is properly set up
import PageLoading from "@/components/common/page-loading";
import NotFound from "@/components/client/not-found";
import { Badge } from "@/components/ui/badge";
import { getEnumLabel } from "@/lib/utils";
import { Role, User } from "@/types/user";
import { format } from "date-fns";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function SettingsProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-row items-center gap-3">
          <h3 className="text-lg font-medium">Profile</h3>
          <Badge className="!rounded-2xl">
            {getEnumLabel(Role, user?.role!)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Last updated date:{" "}
          {user?.lastUpdatedDate
            ? format(new Date(user.lastUpdatedDate), "yyyy-MM-dd HH:mm:ss")
            : "No date available"}
        </p>
      </div>
      <Separator />
      <ProfileForm user={user ?? undefined} /> {/* Pass user data to the form */}
    </div>
  );
}
