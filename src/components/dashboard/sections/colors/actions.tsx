"use client";

import {DeleteBaseEntitysDialog} from "@/components/common/data-table-generic/delete-dialog-generic";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {colorService} from "@/services/color-service";
import {Color} from "@/types/color";
import {Row} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

interface ActionsProps {
    row: Row<Color>;
}

const Actions: React.FC<ActionsProps> = ({row}) => {
    const model = row.original;
    const router = useRouter();
    const pathName = usePathname();
    const handleEditClick = () => {
        router.push(`${pathName}/${model.id}`);
    };

    const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

    const handleColorsClick = () => {
        //row.toggleSelected();
        router.push(`${pathName}?q=${model.id}`);
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
                        onClick={() => navigator.clipboard.writeText(model.id!)}
                    >
                        Copy model ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleColorsClick}>
                        View photos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteBaseEntitysDialog
                deleteById={colorService.delete}
                open={showDeleteTaskDialog}
                onOpenChange={setShowDeleteTaskDialog}
                list={[model]}
                showTrigger={false}
                onSuccess={() => row.toggleSelected(false)}
            />
        </>
    );
};

export default Actions;
