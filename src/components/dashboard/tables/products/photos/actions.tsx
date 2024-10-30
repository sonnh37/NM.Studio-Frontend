import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {Photo} from "@/types/photo";
import axios from "axios";
import {ProductXPhoto} from "@/types/product";
import React from "react";
import {redirect, useParams} from 'next/navigation'
import {useRefresh} from "@/components/dashboard/refresh-context";

const ActionCell: React.FC<{ photo: Photo }> = ({photo}) => {
    const {refresh} = useRefresh();
    const params = useParams<{ productId: string }>();

    const handleAddPhoto = async () => {
        const productId = params.productId;
        const productXPhotoCommand_: Partial<ProductXPhoto> = {
            productId: productId.toString(),
            photoId: photo.id,
        };

        try {
            await axios.post(`https://localhost:7192/products/productXPhotos`, productXPhotoCommand_);
            refresh();
        } catch (error: any) {
            console.error('Failed to add photo', error.response?.data || error.message);
        }
    };

    const handlePhotosClick = () => {
        redirect(`/dashboard/photo/${photo.id}/photos`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(photo.id)}>
                    Copy model ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePhotosClick}>
                    View photos
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleAddPhoto}>
                    Add
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionCell;
