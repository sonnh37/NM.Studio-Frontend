"use client";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Photo} from "@/types/photo";
import {useQueryClient} from "@tanstack/react-query";
import {Row} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";

interface ActionsProps {
    row: Row<Photo>;
    onPhotoSelect: (photo: Photo) => void; // Thêm thuộc tính để nhận hàm chọn khóa học
}

const Actions: React.FC<ActionsProps> = ({row, onPhotoSelect}) => {
    const model = row.original;
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleSelectPhoto = () => {
        onPhotoSelect(model); // Gọi hàm onPhotoSelect để cập nhật khóa học
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(model.id)}
                    >
                        Copy model ID
                    </DropdownMenuItem>
                    {/*<DropdownMenuItem onClick={handlePhotosClick}>*/}
                    {/*    View photos*/}
                    {/*</DropdownMenuItem>*/}
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleSelectPhoto}>
                        Select
                    </DropdownMenuItem>{" "}
                    {/* Thêm hành động chọn khóa học */}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Actions;
