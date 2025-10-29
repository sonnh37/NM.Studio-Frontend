"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { User } from "@/types/entities/user";
import { MessageCircle, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TypographySmall } from "./typography/typography-small";
import { TypographyMuted } from "./typography/typography-muted";
import { Separator } from "../ui/separator";
import { UserContext } from "@/types/models/user-context";

interface ChatPopoverProps {
  user?: UserContext | null;
  unreadCount?: number;
}

// Mock data - bạn nên thay bằng dữ liệu thực từ API
const mockChats = [
  {
    id: "1",
    name: "Nhóm dự án ABC",
    lastMessage: "Bạn đã hoàn thành task chưa?",
    time: "10 phút trước",
    unread: 2,
    avatar: "/avatars/group-default.png"
  },
  {
    id: "2",
    name: "Nguyễn Văn A",
    lastMessage: "Tôi sẽ gửi tài liệu sau",
    time: "1 giờ trước",
    unread: 0,
    avatar: "/avatars/user1.jpg"
  },
  {
    id: "3",
    name: "Nhóm học tập",
    lastMessage: "Buổi meeting lúc 3h chiều",
    time: "3 giờ trước",
    unread: 5,
    avatar: "/avatars/group-study.png"
  },
];

export function ChatPopover({ user = null, unreadCount = 0 }: ChatPopoverProps) {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.push("/chat")}
        >
          {unreadCount > 0 ? (
            <MessageSquareText className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          )}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 rounded-full"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Tin nhắn</span>
        </Button>
      </PopoverTrigger>
      
     
    </Popover>
  );
}