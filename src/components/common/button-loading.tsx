import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export const ButtonLoading = ({className}: { className?: string }) => {
    return (
        <Button disabled className={`${cn("animate-spin", className)}`}>
            <Loader2/>
            Please wait
        </Button>
    );
};
