"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { User } from "@/types/entities/user";
import { Bell, BellDot, Check, Mail, MoreHorizontal, Pin, Trash2, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { TypographySmall } from "./typography/typography-small";
import { TypographyMuted } from "./typography/typography-muted";
import { TypographyH3 } from "./typography/typography-h3";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationService } from "@/services/notification-service";
import { Notification } from "@/types/notification";
import { NotificationType } from "@/types/enums/notification";
import useNotification from "@/hooks/use-notification";
import { NotificationGetAllByCurrentUserQuery } from "@/types/models/queries/notifications/notifications-get-all-by-current-user-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface NotificationPopoverProps {
  user?: User | null;
}

export function NotificationPopover({ user = null }: NotificationPopoverProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const query: NotificationGetAllByCurrentUserQuery = {
    pageNumber: 1,
    pageSize: 10,
    isPagination: true,
  };
  
  const res = useNotification(query);
  const notifications = res.notifications || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["notifications"] });
      toast.success("Đánh dấu đã đọc thành công");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notificationService.delete(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["notifications"] });
      toast.success("Xóa thông báo thành công");
    },
  });

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      await queryClient.refetchQueries({ queryKey: ["notifications"] });
      toast.success("Đã đánh dấu tất cả là đã đọc");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          size="icon" 
          className="relative"
        >
          {unreadCount > 0 ? (
            <BellDot className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <Bell className="h-5 w-5" strokeWidth={1.5} />
          )}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 rounded-full"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Thông báo</span>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-[400px] p-0 rounded-xl shadow-lg border" 
        align="end" 
        forceMount
      >
        <div className="grid gap-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <TypographyH3 className="font-semibold">
                Thông báo
              </TypographyH3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="px-2 py-0.5">
                  {unreadCount} mới
                </Badge>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="text-primary hover:text-primary"
            >
              Đọc tất cả
            </Button>
          </div>

          <Separator />

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-10 rounded-none bg-background px-4">
              <TabsTrigger value="all" className="py-1 h-8">Tất cả</TabsTrigger>
              <TabsTrigger value="system" className="py-1 h-8">Hệ thống</TabsTrigger>
              <TabsTrigger value="team" className="py-1 h-8">Nhóm</TabsTrigger>
              <TabsTrigger value="unread" className="py-1 h-8">Chưa đọc</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px] w-full">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 gap-3">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                  <TypographySmall className="text-muted-foreground">
                    Không có thông báo mới
                  </TypographySmall>
                </div>
              ) : (
                <>
                  <TabsContent value="all" className="m-0">
                    {notifications.map((noti) => (
                      <NotificationItem
                        key={noti.id}
                        noti={noti}
                        onMarkAsRead={() => noti.id && markAsReadMutation.mutate(noti.id)}
                        onDelete={() => noti.id && deleteMutation.mutate(noti.id)}
                      />
                    ))}
                  </TabsContent>
                  <TabsContent value="system" className="m-0">
                    {notifications
                      .filter((n) => n.type === NotificationType.SystemWide)
                      .map((noti) => (
                        <NotificationItem
                          key={noti.id}
                          noti={noti}
                          onMarkAsRead={() => noti.id && markAsReadMutation.mutate(noti.id)}
                          onDelete={() => noti.id && deleteMutation.mutate(noti.id)}
                        />
                      ))}
                  </TabsContent>
                  <TabsContent value="team" className="m-0">
                    {notifications
                      .filter((n) => n.type === NotificationType.Team)
                      .map((noti) => (
                        <NotificationItem
                          key={noti.id}
                          noti={noti}
                          onMarkAsRead={() => noti.id && markAsReadMutation.mutate(noti.id)}
                          onDelete={() => noti.id && deleteMutation.mutate(noti.id)}
                        />
                      ))}
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    {notifications
                      .filter((n) => !n.isRead)
                      .map((noti) => (
                        <NotificationItem
                          key={noti.id}
                          noti={noti}
                          onMarkAsRead={() => noti.id && markAsReadMutation.mutate(noti.id)}
                          onDelete={() => noti.id && deleteMutation.mutate(noti.id)}
                        />
                      ))}
                  </TabsContent>
                </>
              )}
            </ScrollArea>
          </Tabs>

          <Separator />

          {/* Footer */}
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full text-primary hover:text-primary"
              onClick={() => router.push("/notifications")}
            >
              Xem tất cả thông báo
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({
  noti,
  onMarkAsRead,
  onDelete,
}: {
  noti: Notification;
  onMarkAsRead: () => void;
  onDelete: () => void;
}) {
  const getNotificationIcon = () => {
    switch (noti.type) {
      case NotificationType.SystemWide:
        return <Mail className="h-5 w-5 text-blue-500" />;
      case NotificationType.Team:
        return <Users className="h-5 w-5 text-green-500" />;
      case NotificationType.Individual:
        return <BellDot className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 hover:bg-accent transition-colors",
        !noti.notificationXUsers.filter(x => x.notificationId)[0].isRead && "bg-blue-50/50 dark:bg-blue-900/10"
      )}
    >
      <div className="mt-0.5 flex-shrink-0">
        {getNotificationIcon()}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <TypographySmall className={cn("line-clamp-2", !noti.isRead && "font-medium")}>
          {noti.description}
        </TypographySmall>
        <TypographyMuted className="text-xs">
          {formatDate(noti.createdDate, true)}
        </TypographyMuted>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={onMarkAsRead} 
            disabled={noti.isRead}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            Đánh dấu đã đọc
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Pin className="h-4 w-4" />
            Ghim
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {noti.type !== NotificationType.Team && (
            <DropdownMenuItem 
              onClick={onDelete} 
              className="gap-2 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}