"use client";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSelectorUser } from "@/hooks/use-auth";
import { useCurrentRole, useCurrentSemester } from "@/hooks/use-current-role";
import {
  updateLocalCache,
  updateUserCache,
} from "@/lib/redux/slices/cacheSlice";
import { AppDispatch } from "@/lib/redux/store";
import { SemesterStatus } from "@/types/enums/semester";
import { Semester } from "@/types/semester";
import { Calendar, ChevronsUpDown, Loader2, Star } from "lucide-react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const statusBadgeVariants = {
  [SemesterStatus.NotStarted]: {
    text: "Chưa bắt đầu",
    variant: "secondary" as const,
  },
  [SemesterStatus.Preparing]: {
    text: "Đang chuẩn bị",
    variant: "outline" as const,
  },
  [SemesterStatus.OnGoing]: {
    text: "Đang diễn ra",
    variant: "default" as const,
  },
  [SemesterStatus.Closed]: {
    text: "Đã kết thúc",
    variant: "destructive" as const,
  },
};

export function SemesterSwitcher() {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelectorUser();

  const { currentSemester, semesterList } = useCurrentSemester();

  // State management
  const [activeSemester, setActiveSemester] = React.useState<Semester | null>(
    null
  );
  const [isChanging, setIsChanging] = React.useState(false);

  // Initialize active semester
  React.useEffect(() => {
    if (currentSemester) {
      setActiveSemester(currentSemester);
    }
  }, [currentSemester]);

  // Early return if data not ready
  if (!user || !semesterList.length || !activeSemester) {
    return null;
  }

  // Filter semesters based on role
  const userSemesterIds = user.userXRoles.map((role) => role.semesterId);
  const userRoles = user.userXRoles
    .map((role) => role.role?.roleName)
    .filter(Boolean);
  const shouldFilterSemesters = !userRoles
    .filter(Boolean)
    .some((role) => ["Manager", "Admin"].includes(role as string));

  const displayedSemesters = shouldFilterSemesters
    ? semesterList.filter((semester) => userSemesterIds.includes(semester.id))
    : semesterList;

  const rolePrimaries = userRoles
    .filter(Boolean)
    .some((role) => ["Manager", "Admin"].includes(role as string));

  const handleSemesterChange = async (semester: Semester) => {
    if (isChanging || semester.id === activeSemester.id) return;

    setIsChanging(true);

    try {
      let newRole = rolePrimaries
        ? user.userXRoles?.find((userRole) => userRole.isPrimary)?.role?.roleName
        : user.userXRoles?.find(
            (userRole) => userRole.semesterId === semester.id
          )?.role?.roleName;

      const payload = {
        semester: semester.id,
        role: newRole,
      };

      setActiveSemester(semester);

      await Promise.all([
        dispatch(updateLocalCache(payload)),
        dispatch(updateUserCache(payload)),
      ]);

      toast.success(
        `Đã chuyển học kỳ "${semester.semesterName}" với role "${newRole}"`
      );
    } catch (error) {
      console.error("Change semester error:", error);
      toast.error((error as string) || "Có lỗi khi thay đổi học kỳ");
      setActiveSemester(currentSemester || semesterList[0]);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isChanging}>
            <SidebarMenuButton className="py-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center justify-center">
                  {isChanging ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <Calendar className="h-4 w-4 dark:text-white text-black" />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <TypographyP className="truncate text-sm">
                    {activeSemester?.semesterName || "Chọn học kỳ"}
                  </TypographyP>
                  <Badge
                    variant={statusBadgeVariants[activeSemester.status].variant}
                    className="text-xs py-0 px-1.5 h-5 flex items-center"
                  >
                    {statusBadgeVariants[activeSemester.status].text}
                  </Badge>
                </div>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {shouldFilterSemesters ? "Học kỳ của bạn" : "Tất cả học kỳ"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {displayedSemesters.map((semester, index) => (
              <DropdownMenuItem
                key={semester.id}
                onClick={() => handleSemesterChange(semester)}
                className="gap-2 p-2"
                disabled={isChanging}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {isChanging && activeSemester?.id === semester.id ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <Calendar className="size-4 shrink-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 truncate">
                      {semester.semesterName}
                      {activeSemester?.id === semester.id && (
                        <Star className="size-3 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <Badge
                      variant={statusBadgeVariants[semester.status].variant}
                      className="text-xs py-0 px-1.5 h-5 mt-0.5 flex items-center"
                    >
                      {statusBadgeVariants[semester.status].text}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}